export default `diff --git a/src/Hunk/SplitHunk/SplitChange.js b/src/Hunk/SplitHunk/SplitChange.js
index 9b69fb6..ca25a5b 100644
--- a/src/Hunk/SplitHunk/SplitChange.js
+++ b/src/Hunk/SplitHunk/SplitChange.js
@@ -2,13 +2,43 @@
 import {memo, useState, useMemo, useCallback} from 'react';
 import PropTypes from 'prop-types';
 import classNames from 'classnames';
-import {computeOldLineNumber, computeNewLineNumber, mergeCallbacks} from '../../utils';
+import {mapValues} from 'lodash';
+import {computeOldLineNumber, computeNewLineNumber} from '../../utils';
 import CodeCell from '../CodeCell';
 import '../Change.css';

 const SIDE_OLD = 0;
 const SIDE_NEW = 1;

+const useCallbackOnSide = (side, setHover, change, customCallbacks) => {
+    const markHover = useCallback(() => setHover(side), []);
+    const unmarkHover = useCallback(() => setHover(''), []);
+    const arg = {side, change};
+    const composeCallback = (own, custom) => {
+        if (custom) {
+            return e => {
+                own(e);
+                custom(); // custom is already bound with arg
+            };
+        }
+
+        return own;
+    };
+    // Unlike selectors, hooks do not provide native functionality to customize comparator,
+    // on realizing that this does not reduce amount of renders, only preventing duplicate merge computations,
+    // we decide not to optimize this extremely, leave it recomputed on certain rerenders.
+    const callbacks = useMemo(
+        () => {
+            const callbacks = mapValues(customCallbacks, fn => () => fn(arg));
+            callbacks.onMouseEnter = composeCallback(markHover, callbacks.onMouseEnter);
+            callbacks.onMouseLeave = composeCallback(unmarkHover, callbacks.onMouseLeave);
+            return callbacks;
+        },
+        [change, customCallbacks]
+    );
+    return callbacks;
+};
+
 const renderCells = args => {
     const {
         change,
@@ -99,30 +129,10 @@ const SplitChange = props => {
     } = props;

     const [hover, setHover] = useState('');
-    const unmarkHover = useCallback(() => setHover(''), []);
-    const useCallbackOnSide = (side, customCallbacks) => {
-        const markHover = useCallback(() => setHover(side), []);
-        const hoverCallbacks = {
-            onMouseEnter: markHover,
-            onMouseLeave: unmarkHover,
-        };
-        const arg = {
-            side,
-            change: side === 'old' ? oldChange : newChange,
-        };
-        // Unlike selectors, hooks do not provide native functionality to customize comparator,
-        // on realizing that this does not reduce amount of renders, only preventing duplicate merge computations,
-        // we decide not to optimize this extremely, leave it recomputed on certain rerenders.
-        const callbacks = useMemo(
-            () => mergeCallbacks(hoverCallbacks, customCallbacks, arg),
-            [unmarkHover, markHover, customCallbacks, arg.change]
-        );
-        return callbacks;
-    };
-    const oldGutterEvents = useCallbackOnSide('old', gutterEvents);
-    const newGutterEvents = useCallbackOnSide('new', gutterEvents);
-    const oldCodeEvents = useCallbackOnSide('old', codeEvents);
-    const newCodeEvents = useCallbackOnSide('new', codeEvents);
+    const oldGutterEvents = useCallbackOnSide('old', setHover, oldChange, gutterEvents);
+    const newGutterEvents = useCallbackOnSide('new', setHover, newChange, gutterEvents);
+    const oldCodeEvents = useCallbackOnSide('old', setHover, oldChange, codeEvents);
+    const newCodeEvents = useCallbackOnSide('new', setHover, newChange, codeEvents);
     const oldAnchorID = oldChange && generateAnchorID(oldChange);
     const newAnchorID = newChange && generateAnchorID(newChange);
     const commons = {`;
