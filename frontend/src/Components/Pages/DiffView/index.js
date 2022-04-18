import {Diff, Decoration, Hunk, withSourceExpansion} from 'react-diff-view';
import tokenize from '../ChangeDetail/tokenize';

const UnfoldCollapsed = ({previousHunk, currentHunk, onClick}) => {
    const start = previousHunk ? previousHunk.oldStart + previousHunk.oldLines : 1;
    const end = currentHunk.oldStart;

    return (
        <div onClick={() => onClick(start, end)}>
            Click to expand
        </div>
    );
};

const UnfoldStub = ({currentHunk, linesCount, onClick}) => {
    const start = currentHunk ? currentHunk.oldStart + currentHunk.oldLines : linesCount;
    const end = linesCount;

    return (
        <div onClick={() => onClick(start, end)}>
            Click to expand
        </div>
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
        if (hunk.oldStart > 1) {
            children.push(decorationElement);
        }

        const hunkElement = (
            <Hunk
                key={'hunk-' + hunk.content}
                hunk={hunk}
            />
        );
        children.push(hunkElement);

        if (index === hunks.length - 1 && hunk.oldStart + hunk.oldLines < linesCount) {
            children.push(
                <UnfoldStub
                    key={'decoration-stub'}
                    currentHunk={hunk}
                    linesCount={linesCount}
                    onClick={onExpandRange}
                />
            );
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