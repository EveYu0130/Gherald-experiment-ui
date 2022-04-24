// export const DIFF_TEXT = `diff --git a/site/components/DiffView/index.js b/site/components/DiffView/index.js
// index f0133e6..4968867 100644
// --- a/site/components/DiffView/index.js
// +++ b/site/components/DiffView/index.js
// @@ -1,3 +1,5 @@
// +import {useCallback} from 'react';
// +import {Tooltip} from 'antd';
//  import {
//      Diff,
//      Hunk,
// @@ -11,10 +13,12 @@ import 'prism-themes/themes/prism-vs.css';
//  import HunkInfo from './HunkInfo';
//  import UnfoldCollapsed from './UnfoldCollapsed';
//  import TokenizeWorker from './Tokenize.worker'; // eslint-disable-line import/default
// -import './index.css';
// +import c from './index.css';
// \u0020
//  const tokenize = new TokenizeWorker();
// \u0020
// +const stopPropagation = e => e.stopPropagation();
// +
//  const DiffView = props => {
//      const {
//          hunks,
// @@ -27,6 +31,31 @@ const DiffView = props => {
//          onExpandRange,
//          onToggleChangeSelection,
//      } = props;
// +    const renderGutter = useCallback(
// +        ({change, side, inHoverState, renderDefault, wrapInAnchor}) => {
// +            const canComment = inHoverState && (viewType === 'split' || side === 'new');
// +            if (canComment) {
// +                return (
// +                    <Tooltip
// +                        title={
// +                            <>
// +                                Comment on line {renderDefault()}
// +                                <br />
// +                                {change.content.slice(0, 10)}...
// +                                <br />
// +                                Not implemented yet
// +                            </>
// +                        }
// +                    >
// +                        <span className={c.commentTrigger} onClick={stopPropagation}>+</span>
// +                    </Tooltip>
// +                );
// +            }
// +
// +            return wrapInAnchor(renderDefault());
// +        },
// +        [viewType]
// +    );
//      const linesCount = oldSource ? oldSource.split('\n').length : 0;
//      const renderHunk = (children, hunk, i, hunks) => {
//          const previousElement = children[children.length - 1];
// @@ -42,13 +71,16 @@ const DiffView = props => {
//              )
//              : <HunkInfo key={'decoration-' + hunk.content} hunk={hunk} />;
//          children.push(decorationElement);
// +        const events = {
// +            onClick: onToggleChangeSelection,
// +        };
// \u0020
//          const hunkElement = (
//              <Hunk
//                  key={'hunk-' + hunk.content}
//                  hunk={hunk}
// -                codeEvents={{onClick: onToggleChangeSelection}}
// -                gutterEvents={{onClick: onToggleChangeSelection}}
// +                codeEvents={events}
// +                gutterEvents={events}
//              />
//          );
//          children.push(hunkElement);
// @@ -78,6 +110,7 @@ const DiffView = props => {
//              gutterType={showGutter ? 'default' : 'none'}
//              selectedChanges={selectedChanges}
//              tokens={tokens}
// +            renderGutter={renderGutter}
//          >
//              {hunks => hunks.reduce(renderHunk, [])}
//          </Diff>
// `;

// export const SOURCE_CODE = `import {
//     Diff,
//     Hunk,
//     withSourceExpansion,
//     minCollapsedLines,
//     withChangeSelect,
//     withTokenizeWorker,
// } from 'react-diff-view';
// import {compose} from 'recompose';
// import 'prism-themes/themes/prism-vs.css';
// import HunkInfo from './HunkInfo';
// import UnfoldCollapsed from './UnfoldCollapsed';
// import TokenizeWorker from './Tokenize.worker'; // eslint-disable-line import/default
// import './index.css';

// const tokenize = new TokenizeWorker();

// const DiffView = props => {
//     const {
//         hunks,
//         oldSource,
//         type,
//         showGutter,
//         viewType,
//         selectedChanges,
//         tokens,
//         onExpandRange,
//         onToggleChangeSelection,
//     } = props;
//     const linesCount = oldSource ? oldSource.split('\n').length : 0;
//     const renderHunk = (children, hunk, i, hunks) => {
//         const previousElement = children[children.length - 1];
//         const decorationElement = oldSource
//             ? (
//                 <UnfoldCollapsed
//                     key={'decoration-' + hunk.content}
//                     previousHunk={previousElement && previousElement.props.hunk}
//                     currentHunk={hunk}
//                     linesCount={linesCount}
//                     onExpand={onExpandRange}
//                 />
//             )
//             : <HunkInfo key={'decoration-' + hunk.content} hunk={hunk} />;
//         children.push(decorationElement);

//         const hunkElement = (
//             <Hunk
//                 key={'hunk-' + hunk.content}
//                 hunk={hunk}
//                 codeEvents={{onClick: onToggleChangeSelection}}
//                 gutterEvents={{onClick: onToggleChangeSelection}}
//             />
//         );
//         children.push(hunkElement);

//         if (i === hunks.length - 1 && oldSource) {
//             const unfoldTailElement = (
//                 <UnfoldCollapsed
//                     key="decoration-tail"
//                     previousHunk={hunk}
//                     linesCount={linesCount}
//                     onExpand={onExpandRange}
//                 />
//             );
//             children.push(unfoldTailElement);
//         }

//         return children;
//     };

//     return (
//         <Diff
//             optimizeSelection
//             viewType={viewType}
//             diffType={type}
//             hunks={hunks}
//             oldSource={oldSource}
//             gutterType={showGutter ? 'default' : 'none'}
//             selectedChanges={selectedChanges}
//             tokens={tokens}
//         >
//             {hunks => hunks.reduce(renderHunk, [])}
//         </Diff>
//     );
// };

// const tokenizeOptions = {
//     mapPayload(data, {editsType}) {
//         return {
//             ...data,
//             editsType: editsType,
//         };
//     },
// };

// const enhance = compose(
//     withSourceExpansion(),
//     minCollapsedLines(5),
//     withChangeSelect({multiple: true}),
//     withTokenizeWorker(tokenize, tokenizeOptions)
// );

// export default enhance(DiffView);
// `;
// export const DIFF_TEXT = '--- a/CHANGELOG.md\n+++ b/CHANGELOG.md\n@@ -13,3 +13,5 @@ Some principles:\n ## v0.0.1 - 2019-11-07\n ### Added\n - 项目初始化代码\n+\n+\n';
// export const SOURCE_CODE = `# Changelog\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\nSome principles:\n- The latest version comes first.\n- The release date of each version is displayed.\n- Follow Semantic Versioning.\n\n## [Unreleased]\n\n## v0.0.1 - 2019-11-07\n### Added\n- 项目初始化代码\n",
// "id": "ab09011fa121d0a2bb9fa4ca76094f2482b902b7`;
export const DIFF_TEXT = "--- a/src/components/Selectors/TaskNameSearchSelect/index.jsx\n+++ b/src/components/Selectors/TaskNameSearchSelect/index.jsx\n@@ -15,6 +15,7 @@ export default ({\n }) => {\n const [fetching, setFetching] = useState(false)\n const [dataSource, setDataSource] = useState([])\n+ const { currentUser } = useSelector((state) => state.user)\n \n async function fetchProjectName(op) {\n const param = queryString.stringify({\n@@ -50,7 +51,7 @@ export default ({\n const handleSearch = debounce((name) => fetchProjectName({ title: name }), 500)\n const handleFocus = () => {\n fetchProjectName({\n- // participantId: window.currentUser.id,\n+ assigneeId: currentUser.id,\n title: ''\n })\n }\n";
export const SOURCE_CODE =
    "import React, { useState } from 'react'\nimport { Select, Spin, Tag } from 'antd'\nimport debounce from 'lodash/debounce'\nimport http from '@/utils/request'\nimport { Item } from '@/components/Selectors/PrioritySelectV2'\nimport { useSelector } from 'umi'\nimport queryString from 'query-string'\nimport styles from './index.module.less'\n\nexport default ({\n searchParam = {},\n searchUrl = '/api/team-resource/tasks',\n allowLabel = false,\n ...props\n}) => {\n const [fetching, setFetching] = useState(false)\n const [dataSource, setDataSource] = useState([])\n const { currentUser } = useSelector((state) => state.user)\n\n async function fetchProjectName(op) {\n const param = queryString.stringify({\n ...searchParam,\n ...op,\n assigneeId: currentUser.id\n })\n setFetching(true)\n setDataSource([])\n const {\n data: { list }\n } = await http.get(`${searchUrl}?${param}`)\n // debugger\n const result = list.map((p) => ({\n label: (\n <span>\n {allowLabel && (\n <Tag color={p.projectType === 7 ? 'success' : 'processing'}>\n {p.projectType === 7 ? '团队' : '项目'}\n </Tag>\n )}\n <span className={styles.TaskItemProject}>{p.projectName}</span>\n <Item value={p.priority.code} />\n {p.title}\n </span>\n ),\n value: p.id,\n name: p.title,\n item: p\n }))\n setFetching(false)\n setDataSource(result)\n }\n const handleSearch = debounce((name) => fetchProjectName({ title: name }), 500)\n const handleFocus = () => {\n fetchProjectName({\n title: ''\n })\n }\n return (\n <Select\n labelInValue\n placeholder=\"请输入项目名称\"\n notFoundContent={fetching ? <Spin size=\"small\" /> : null}\n filterOption={false}\n optionLabelProp=\"name\"\n onSearch={handleSearch}\n onFocus={handleFocus}\n showSearch\n options={dataSource}\n {...props}\n />\n )\n}\n";
