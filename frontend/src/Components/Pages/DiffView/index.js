import {Diff, Decoration, Hunk, withSourceExpansion, getChangeKey} from 'react-diff-view';
import tokenize from '../ChangeDetail/tokenize';
import {IconButton, Typography, Box, Alert} from "@mui/material";
import React from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandIcon from '@mui/icons-material/Expand';

const getWidgets = hunks => {
    const changes = hunks.reduce((result, {changes}) => [...result, ...changes], []);
    const warning = changes.filter(({type}) => Math.random() < 0.5 && (type === "insert" || type === "delete"));
    return warning.reduce(
        (widgets, change) => {
            const changeKey = getChangeKey(change);

            return {
                ...widgets,
                [changeKey]: <Alert severity="warning">This line in change is risky — check it out!</Alert>
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

const DiffView = ({hunks, onExpandRange, linesCount}) => {
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
        <Diff hunks={hunks} diffType="modify" viewType="split" tokens={tokenize(hunks)} widgets={getWidgets(hunks)}>
            {hunks => hunks.reduce(renderHunk, [])}
        </Diff>
    );
};

export default withSourceExpansion()(DiffView);