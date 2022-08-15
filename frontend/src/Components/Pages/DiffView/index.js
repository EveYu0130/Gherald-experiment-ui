import './index.css';
import {Diff, Decoration, Hunk, withSourceExpansion, getChangeKey, tokenize, useSourceExpansion} from 'react-diff-view';
import {IconButton, Typography, Box, Alert, AlertTitle} from "@mui/material";
import React, {useMemo} from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandIcon from '@mui/icons-material/Expand';
import * as refractor from "refractor";
import 'prism-themes/themes/prism-vs.css';
import styled from "styled-components";

const ExpandButton = styled(Box)({
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    textAlign: 'center',
    '&:hover': {
        backgroundColor: '#bdbdbd',
    }
});

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

const ExpandUpAll = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-up" size="small">
                    <ExpandLessIcon />
                    <Typography variant="button" color="text.secondary">Expand all {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const ExpandAll = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-all" size="small">
                    <ExpandIcon />
                    <Typography variant="button" color="text.secondary">Expand all {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const ExpandUp = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-up" size="small">
                    <ExpandLessIcon />
                    <Typography variant="button" color="text.secondary">Expand up {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const ExpandDown = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-down" size="small">
                    <ExpandMoreIcon />
                    <Typography variant="button" color="text.secondary">Expand down {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const ExpandDownAll = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-down" size="small">
                    <ExpandMoreIcon />
                    <Typography variant="button" color="text.secondary">Expand all {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const renderToken = (token, defaultRender, i) => {
    switch (token.type) {
        case 'space':
            console.log(token);
            return (
                <span key={i} className="space">
                    {token.children && token.children.map((token, i) => renderToken(token, defaultRender, i))}
                </span>
            );
        default:
            return defaultRender(token, i);
    }
};

const DiffView = ({hunks, onExpandRange, linesCount, modifiedLines, modifiedMethods}) => {
    const options = {
        refractor: refractor,
        highlight: true,
        // oldSource: oldSource,
        language: 'java',
        // enhancers: [
        //     markEdits(hunks)
        //     // markEdits(hunks, {type: 'block'})
        // ],
    };
    const tokens = tokenize(hunks, options);
    console.log(hunks);
    console.log(tokens);
    // const tokens = useMemo(() => tokenize(hunks, oldSource), [hunks]);

    const renderHunk = (children, hunk, index) => {
        const previousElement = children[children.length - 1];

        if (previousElement) {
            const previousHunk = previousElement.props.hunk;
            const previousEnd = previousHunk.oldStart + previousHunk.oldLines;
            const currentStart = hunk.oldStart;
            if (currentStart - previousEnd < 20) {
                const expandAllElement = (
                    <ExpandAll
                        key={'expand-all-' + hunk.content}
                        start={previousEnd}
                        end={currentStart}
                        onClick={onExpandRange}
                    />
                );
                children.push(expandAllElement);
            } else {
                const expandDownElement = (
                    <ExpandDown
                        key={'expand-down-' + hunk.content}
                        previousHunk={previousHunk}
                        start={previousEnd}
                        end={previousEnd + 20}
                        onClick={onExpandRange}
                    />
                );
                const expandUpElement = (
                    <ExpandUp
                        key={'expand-up-' + hunk.content}
                        start={hunk.oldStart - 20}
                        end={currentStart}
                        onClick={onExpandRange}
                    />
                );
                children.push(expandDownElement);
                children.push(expandUpElement);
            }
        } else {
            const currentStart = hunk.oldStart;
            const expandUpAllElement = (
                <ExpandUpAll
                    key={'expand-up-' + hunk.content}
                    start={1}
                    end={currentStart}
                    onClick={onExpandRange}
                />
            );
            children.push(expandUpAllElement);
            if (currentStart > 20) {
                const expandUpElement = (
                    <ExpandUp
                        key={'expand-up-' + hunk.content}
                        start={currentStart - 20}
                        end={currentStart}
                        onClick={onExpandRange}
                    />
                );
                children.push(expandUpElement);
            }
        }

        const hunkElement = (
            <Hunk
                key={'hunk-' + hunk.content}
                hunk={hunk}
            />
        );
        children.push(hunkElement);


        if (index === hunks.length - 1) {
            const currentEnd = hunk.oldStart + hunk.oldLines;
            if (currentEnd + 20 < linesCount) {
                const expandDownElement = (
                    <ExpandDown
                        key={'expand-down-' + hunk.content}
                        start={currentEnd}
                        end={currentEnd + 20}
                        onClick={onExpandRange}
                    />
                )
                children.push(expandDownElement);
            }
            const expandDownAllElement = (
                <ExpandDownAll
                    key={'expand-down-' + hunk.content}
                    start={currentEnd}
                    end={linesCount}
                    onClick={onExpandRange}
                />
            )
            children.push(expandDownAllElement);
        }

        return children;
    };

    return (
        <Diff className={"diff-view"} hunks={hunks} diffType="modify" viewType="split" tokens={tokens} widgets={getWidgets(hunks, modifiedLines, modifiedMethods)}>
            {hunks => hunks.reduce(renderHunk, [])}
        </Diff>
    );
};

export default withSourceExpansion()(DiffView);
