import {Diff, Decoration, Hunk, withSourceExpansion} from 'react-diff-view';
import tokenize from '../ChangeDetail/tokenize';
import {IconButton, Typography, Box} from "@mui/material";
import React from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandIcon from '@mui/icons-material/Expand';

const UnfoldCollapsed = ({previousHunk, currentHunk, onClick}) => {
    const start = previousHunk ? previousHunk.oldStart + previousHunk.oldLines : 1;
    const end = currentHunk.oldStart;

    return (
        <div>
            <IconButton aria-label="expand-all" size="small" onClick={() => onClick(start, end)}>
                <ExpandIcon />
            </IconButton>
        </div>
        // <div onClick={() => onClick(start, end)}>
        //     Expand all
        // </div>
    );
};

const ExpandUp = ({previousHunk, currentHunk, onClick}) => {
    let start = previousHunk ? previousHunk.oldStart + previousHunk.oldLines : 1;
    const end = currentHunk.oldStart;
    if (end - start > 15) {
        start = end - 15
    }

    return (
        <div>
            <IconButton aria-label="expand-up" size="small" onClick={() => onClick(start, end)}>
                <ExpandLessIcon />
            </IconButton>
        </div>
        // <div onClick={() => onClick(start, end)}>
        //     Expand Up
        // </div>
    );
};

const ExpandDown = ({currentHunk, linesCount, onClick}) => {
    const start = currentHunk ? currentHunk.oldStart + currentHunk.oldLines : linesCount;
    const end = start + 15 < linesCount ? start + 15 : linesCount;

    return (
        <div>
            <IconButton aria-label="expand-down" size="small" onClick={() => onClick(start, end)}>
                <ExpandMoreIcon />
            </IconButton>
        </div>
        // <div onClick={() => onClick(start, end)}>
        //     Expand down
        // </div>
    );
};

const UnfoldStub = ({currentHunk, linesCount, onClick}) => {
    const start = currentHunk ? currentHunk.oldStart + currentHunk.oldLines : linesCount;
    const end = linesCount;

    return (
        <div>
            <IconButton aria-label="expand-all" size="small" onClick={() => onClick(start, end)}>
                <ExpandIcon />
            </IconButton>
        </div>
        // <div onClick={() => onClick(start, end)}>
        //     Expand all
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
        <Diff hunks={hunks} diffType="modify" viewType="split" tokens={tokenize(hunks)}>
            {hunks => hunks.reduce(renderHunk, [])}
        </Diff>
    );
};

export default withSourceExpansion()(DiffView);