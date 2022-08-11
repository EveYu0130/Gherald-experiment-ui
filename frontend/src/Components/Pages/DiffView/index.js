import {Diff, Decoration, Hunk, withSourceExpansion, getChangeKey} from 'react-diff-view';
import tokenize from '../ChangeDetail/tokenize';
import {IconButton, Typography, Box, Alert, AlertTitle} from "@mui/material";
import React from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandIcon from '@mui/icons-material/Expand';
import {Link} from "react-router-dom";

const getWidgets = (hunks, modifiedLines, modifiedMethods) => {
    const lines = Object.assign({}, ...modifiedLines.map((x) => ({[x.lineNumber]: {...x}})));

    const changes = hunks.reduce((result, {changes}) => [...result, ...changes], []);
    let methods = modifiedMethods.map(method => {
        let insert_start = method.endLine + 1;
        let delete_start = method.endLine + 1;
        changes.forEach(change => {
            if (change.type === "insert" && change.lineNumber >= method.startLine && change.lineNumber <= method.endLine) {
                insert_start = Math.min(insert_start, change.lineNumber)
            }
            if (change.type === "delete" && change.lineNumber >= method.startLine && change.lineNumber <= method.endLine) {
                delete_start = Math.min(insert_start, change.lineNumber)
            }
        })
        // const labelled_line = insert_start > method.endLine ? delete_start - 1 : insert_start - 1;
        const labelled_line = method.startLine - 1;
        const delete_only = insert_start > method.endLine;
        return {
            ...method,
            labelled_line,
            delete_only
        }
    })
    methods = Object.assign({}, ...methods.map((x) => ({[x.labelled_line]: {...x}})));
    const warning = changes.filter((change) =>
        (change.type === "insert" && change.lineNumber in lines && lines[change.lineNumber]["riskScore"] > 0)
        || (change.type === "normal" && change.newLineNumber in methods && !methods[change.newLineNumber]["delete_only"])
        || (change.type === "normal" && change.oldLineNumber in methods && methods[change.oldLineNumber]["delete_only"]));
    return warning.reduce(
        (widgets, change) => {
            const changeKey = getChangeKey(change);

            return {
                ...widgets,
                [changeKey]:
                    change.type === "insert" ?
                        <Alert severity="warning">
                            <AlertTitle>GHERALD line risk score: {lines[change.lineNumber]["riskScore"]}</AlertTitle>
                            This line is risky — check it out!
                        </Alert>
                        :
                        (change.oldLineNumber in methods && methods[change.oldLineNumber]["delete_only"]) ?
                            <Alert severity="warning">
                                <AlertTitle>GHERALD method risk: there have been {methods[change.oldLineNumber]["priorBugs"]} prior bugs among {methods[change.oldLineNumber]["priorChanges"]} changes</AlertTitle>
                                Method: {methods[change.oldLineNumber]["name"]}
                            </Alert>
                            :
                            <Alert severity="warning">
                                <AlertTitle>GHERALD method risk: there have been {methods[change.newLineNumber]["priorBugs"]} prior bugs among {methods[change.newLineNumber]["priorChanges"]} changes</AlertTitle>
                                Method: {methods[change.newLineNumber]["name"]}
                            </Alert>
            };
        },
        {}
    );
};

const UnfoldCollapsed = ({previousHunk, currentHunk, onClick}) => {
    const start = previousHunk ? previousHunk.oldStart + previousHunk.oldLines : 1;
    const end = currentHunk.oldStart;

    return (
        // <div>
        //     <IconButton aria-label="expand-all" size="small" onClick={() => onClick(start, end)}>
        //         <ExpandIcon />
        //     </IconButton>
        // </div>
        <Decoration>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <IconButton aria-label="expand-all" size="small" onClick={() => onClick(start, end)}>
                    <ExpandIcon />
                    <Typography variant="button" color="text.secondary">Expand all</Typography>
                </IconButton>
            </Box>
        </Decoration>
    );
};

const ExpandUp = ({previousHunk, currentHunk, onClick}) => {
    let start = previousHunk ? previousHunk.oldStart + previousHunk.oldLines : 1;
    const end = currentHunk.oldStart;
    if (end - start > 15) {
        start = end - 15
    }

    return (
        <Decoration>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <IconButton aria-label="expand-up" size="small" onClick={() => onClick(start, end)}>
                    <ExpandLessIcon />
                    <Typography variant="button" color="text.secondary">Expand up</Typography>
                </IconButton>
            </Box>
        </Decoration>
        // <div>
        //     <IconButton aria-label="expand-up" size="small" onClick={() => onClick(start, end)}>
        //         <ExpandLessIcon />
        //     </IconButton>
        // </div>
    );
};

const ExpandDown = ({currentHunk, linesCount, onClick}) => {
    const start = currentHunk ? currentHunk.oldStart + currentHunk.oldLines : linesCount;
    const end = start + 15 < linesCount ? start + 15 : linesCount;

    return (
        <Decoration>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <IconButton aria-label="expand-down" size="small" onClick={() => onClick(start, end)}>
                    <ExpandMoreIcon />
                    <Typography variant="button" color="text.secondary">Expand down</Typography>
                </IconButton>
            </Box>
        </Decoration>
        // <div>
        //     <IconButton aria-label="expand-down" size="small" onClick={() => onClick(start, end)}>
        //         <ExpandMoreIcon />
        //     </IconButton>
        // </div>
    );
};

const UnfoldStub = ({currentHunk, linesCount, onClick}) => {
    const start = currentHunk ? currentHunk.oldStart + currentHunk.oldLines : linesCount;
    const end = linesCount;

    return (
        <Decoration>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <IconButton aria-label="expand-all" size="small" onClick={() => onClick(start, end)}>
                    <ExpandIcon />
                    <Typography variant="button" color="text.secondary">Expand all</Typography>
                </IconButton>
            </Box>
        </Decoration>
        // <div>
        //     <IconButton aria-label="expand-all" size="small" onClick={() => onClick(start, end)}>
        //         <ExpandIcon />
        //     </IconButton>
        // </div>
    );
};

const DiffView = ({hunks, onExpandRange, linesCount, modifiedLines, modifiedMethods}) => {
    const renderHunk = (children, hunk, index) => {
        const previousElement = children[children.length - 1];
        const decorationElement = (
            <UnfoldCollapsed
                key={'decoration-' + hunk.content}
                previousHunk={previousElement && previousElement.props.hunk}
                currentHunk={hunk}
                onClick={onExpandRange}
            />
        );
        const expandUpElement = (
            <ExpandUp
                key={'expand-up-' + hunk.content}
                previousHunk={previousElement && previousElement.props.hunk}
                currentHunk={hunk}
                onClick={onExpandRange}
            />
        )
        if (hunk.oldStart > 1) {
            children.push(decorationElement);
            children.push(expandUpElement);
        }

        const hunkElement = (
            <Hunk
                key={'hunk-' + hunk.content}
                hunk={hunk}
            />
        );
        children.push(hunkElement);

        const expandDownElement = (
            <ExpandDown
                key={'expand-down-' + hunk.content}
                currentHunk={hunk}
                linesCount={linesCount}
                onClick={onExpandRange}
            />
        )

        if (hunk.oldStart + hunk.oldLines < linesCount) {
            children.push(expandDownElement);
            if (index === hunks.length - 1) {
                children.push(
                    <UnfoldStub
                        key={'decoration-stub'}
                        currentHunk={hunk}
                        linesCount={linesCount}
                        onClick={onExpandRange}
                    />
                );
            }
        }

        return children;
    };

    return (
        <Diff hunks={hunks} diffType="modify" viewType="split" tokens={tokenize(hunks)} widgets={getWidgets(hunks, modifiedLines, modifiedMethods)}>
            {hunks => hunks.reduce(renderHunk, [])}
        </Diff>
    );
};

export default withSourceExpansion()(DiffView);