/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOM
 */

/* globals __REACT_DEVTOOLS_GLOBAL_HOOK__*/

'use strict';

var ReactCurrentOwner = require('./ReactCurrentOwner');
var ReactDOMTextComponent = require('./ReactDOMTextComponent');
var ReactDefaultInjection = require('./ReactDefaultInjection');
var ReactInstanceHandles = require('./ReactInstanceHandles');
var ReactMount = require('./ReactMount');
var ReactPerf = require('./ReactPerf');
var ReactReconciler = require('./ReactReconciler');
var ReactUpdates = require('./ReactUpdates');
var ReactVersion = require('./ReactVersion');

var findDOMNode = require('./findDOMNode');
var renderSubtreeIntoContainer = require('./renderSubtreeIntoContainer');
var warning = require('fbjs/lib/warning');

ReactDefaultInjection.inject();

var render = ReactPerf.measure('React', 'render', ReactMount.render);

var React = {
  findDOMNode: findDOMNode,
  render: render,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: ReactVersion,

  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
};

// Inject the runtime into a devtools global hook regardless of browser.
// Allows for debugging when the hook is injected on the page.
/* eslint-enable camelcase */
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
    CurrentOwner: ReactCurrentOwner,
    InstanceHandles: ReactInstanceHandles,
    Mount: ReactMount,
    Reconciler: ReactReconciler,
    TextComponent: ReactDOMTextComponent
  });
}

if (process.env.NODE_ENV !== 'production') {
  var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
  if (ExecutionEnvironment.canUseDOM && window.top === window.self) {

    // First check if devtools is not installed
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
      // If we're in Chrome or Firefox, provide a download link if not installed.
      if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
        console.debug('Download the React DevTools for a better development experience: ' + 'https://fb.me/react-devtools');
      }
    }

    // If we're in IE8, check to see if we are in compatibility mode and provide
    // information on preventing compatibility mode
    var ieCompatibilityMode = document.documentMode && document.documentMode < 8;

    process.env.NODE_ENV !== 'production' ? warning(!ieCompatibilityMode, 'Internet Explorer is running in compatibility mode; please add the ' + 'following tag to your HTML to prevent this from happening: ' + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />') : undefined;

    var expectedFeatures = [
    // shims
    Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim,

    // shams
    Object.create, Object.freeze];

    for (var i = 0; i < expectedFeatures.length; i++) {
      if (!expectedFeatures[i]) {
        console.error('One or more ES5 shim/shams expected by React are not available: ' + 'https://fb.me/react-warning-polyfills');
        break;
      }
    }
  }
}

module.exports = React;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0RE9NLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFhQTs7QUFFQSxJQUFJLG9CQUFvQixRQUFRLHFCQUFSLENBQXBCO0FBQ0osSUFBSSx3QkFBd0IsUUFBUSx5QkFBUixDQUF4QjtBQUNKLElBQUksd0JBQXdCLFFBQVEseUJBQVIsQ0FBeEI7QUFDSixJQUFJLHVCQUF1QixRQUFRLHdCQUFSLENBQXZCO0FBQ0osSUFBSSxhQUFhLFFBQVEsY0FBUixDQUFiO0FBQ0osSUFBSSxZQUFZLFFBQVEsYUFBUixDQUFaO0FBQ0osSUFBSSxrQkFBa0IsUUFBUSxtQkFBUixDQUFsQjtBQUNKLElBQUksZUFBZSxRQUFRLGdCQUFSLENBQWY7QUFDSixJQUFJLGVBQWUsUUFBUSxnQkFBUixDQUFmOztBQUVKLElBQUksY0FBYyxRQUFRLGVBQVIsQ0FBZDtBQUNKLElBQUksNkJBQTZCLFFBQVEsOEJBQVIsQ0FBN0I7QUFDSixJQUFJLFVBQVUsUUFBUSxrQkFBUixDQUFWOztBQUVKLHNCQUFzQixNQUF0Qjs7QUFFQSxJQUFJLFNBQVMsVUFBVSxPQUFWLENBQWtCLE9BQWxCLEVBQTJCLFFBQTNCLEVBQXFDLFdBQVcsTUFBWCxDQUE5Qzs7QUFFSixJQUFJLFFBQVE7QUFDVixlQUFhLFdBQWI7QUFDQSxVQUFRLE1BQVI7QUFDQSwwQkFBd0IsV0FBVyxzQkFBWDtBQUN4QixXQUFTLFlBQVQ7OztBQUdBLDJCQUF5QixhQUFhLGNBQWI7QUFDekIsdUNBQXFDLDBCQUFyQztDQVJFOzs7OztBQWNKLElBQUksT0FBTyw4QkFBUCxLQUEwQyxXQUExQyxJQUF5RCxPQUFPLCtCQUErQixNQUEvQixLQUEwQyxVQUFqRCxFQUE2RDtBQUN4SCxpQ0FBK0IsTUFBL0IsQ0FBc0M7QUFDcEMsa0JBQWMsaUJBQWQ7QUFDQSxxQkFBaUIsb0JBQWpCO0FBQ0EsV0FBTyxVQUFQO0FBQ0EsZ0JBQVksZUFBWjtBQUNBLG1CQUFlLHFCQUFmO0dBTEYsRUFEd0g7Q0FBMUg7O0FBVUEsSUFBSSxRQUFRLEdBQVIsQ0FBWSxRQUFaLEtBQXlCLFlBQXpCLEVBQXVDO0FBQ3pDLE1BQUksdUJBQXVCLFFBQVEsK0JBQVIsQ0FBdkIsQ0FEcUM7QUFFekMsTUFBSSxxQkFBcUIsU0FBckIsSUFBa0MsT0FBTyxHQUFQLEtBQWUsT0FBTyxJQUFQLEVBQWE7OztBQUdoRSxRQUFJLE9BQU8sOEJBQVAsS0FBMEMsV0FBMUMsRUFBdUQ7O0FBRXpELFVBQUksVUFBVSxTQUFWLENBQW9CLE9BQXBCLENBQTRCLFFBQTVCLElBQXdDLENBQUMsQ0FBRCxJQUFNLFVBQVUsU0FBVixDQUFvQixPQUFwQixDQUE0QixNQUE1QixNQUF3QyxDQUFDLENBQUQsSUFBTSxVQUFVLFNBQVYsQ0FBb0IsT0FBcEIsQ0FBNEIsU0FBNUIsSUFBeUMsQ0FBQyxDQUFELEVBQUk7QUFDM0ksZ0JBQVEsS0FBUixDQUFjLHNFQUFzRSw4QkFBdEUsQ0FBZCxDQUQySTtPQUE3STtLQUZGOzs7O0FBSGdFLFFBWTVELHNCQUFzQixTQUFTLFlBQVQsSUFBeUIsU0FBUyxZQUFULEdBQXdCLENBQXhCLENBWmE7O0FBY2hFLFlBQVEsR0FBUixDQUFZLFFBQVosS0FBeUIsWUFBekIsR0FBd0MsUUFBUSxDQUFDLG1CQUFELEVBQXNCLHdFQUF3RSw2REFBeEUsR0FBd0kseURBQXhJLENBQXRFLEdBQTJRLFNBQTNRLENBZGdFOztBQWdCaEUsUUFBSSxtQkFBbUI7O0FBRXZCLFVBQU0sT0FBTixFQUFlLE1BQU0sU0FBTixDQUFnQixLQUFoQixFQUF1QixNQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsRUFBeUIsTUFBTSxTQUFOLENBQWdCLE9BQWhCLEVBQXlCLE1BQU0sU0FBTixDQUFnQixHQUFoQixFQUFxQixLQUFLLEdBQUwsRUFBVSxTQUFTLFNBQVQsQ0FBbUIsSUFBbkIsRUFBeUIsT0FBTyxJQUFQLEVBQWEsT0FBTyxTQUFQLENBQWlCLEtBQWpCLEVBQXdCLE9BQU8sU0FBUCxDQUFpQixJQUFqQjs7O0FBR3JMLFdBQU8sTUFBUCxFQUFlLE9BQU8sTUFBUCxDQUxYLENBaEI0RDs7QUF1QmhFLFNBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLGlCQUFpQixNQUFqQixFQUF5QixHQUE3QyxFQUFrRDtBQUNoRCxVQUFJLENBQUMsaUJBQWlCLENBQWpCLENBQUQsRUFBc0I7QUFDeEIsZ0JBQVEsS0FBUixDQUFjLHFFQUFxRSx1Q0FBckUsQ0FBZCxDQUR3QjtBQUV4QixjQUZ3QjtPQUExQjtLQURGO0dBdkJGO0NBRkY7O0FBa0NBLE9BQU8sT0FBUCxHQUFpQixLQUFqQiIsImZpbGUiOiJSZWFjdERPTS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERPTVxuICovXG5cbi8qIGdsb2JhbHMgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RET01UZXh0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdERPTVRleHRDb21wb25lbnQnKTtcbnZhciBSZWFjdERlZmF1bHRJbmplY3Rpb24gPSByZXF1aXJlKCcuL1JlYWN0RGVmYXVsdEluamVjdGlvbicpO1xudmFyIFJlYWN0SW5zdGFuY2VIYW5kbGVzID0gcmVxdWlyZSgnLi9SZWFjdEluc3RhbmNlSGFuZGxlcycpO1xudmFyIFJlYWN0TW91bnQgPSByZXF1aXJlKCcuL1JlYWN0TW91bnQnKTtcbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCcuL1JlYWN0UGVyZicpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgnLi9SZWFjdFVwZGF0ZXMnKTtcbnZhciBSZWFjdFZlcnNpb24gPSByZXF1aXJlKCcuL1JlYWN0VmVyc2lvbicpO1xuXG52YXIgZmluZERPTU5vZGUgPSByZXF1aXJlKCcuL2ZpbmRET01Ob2RlJyk7XG52YXIgcmVuZGVyU3VidHJlZUludG9Db250YWluZXIgPSByZXF1aXJlKCcuL3JlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuUmVhY3REZWZhdWx0SW5qZWN0aW9uLmluamVjdCgpO1xuXG52YXIgcmVuZGVyID0gUmVhY3RQZXJmLm1lYXN1cmUoJ1JlYWN0JywgJ3JlbmRlcicsIFJlYWN0TW91bnQucmVuZGVyKTtcblxudmFyIFJlYWN0ID0ge1xuICBmaW5kRE9NTm9kZTogZmluZERPTU5vZGUsXG4gIHJlbmRlcjogcmVuZGVyLFxuICB1bm1vdW50Q29tcG9uZW50QXROb2RlOiBSZWFjdE1vdW50LnVubW91bnRDb21wb25lbnRBdE5vZGUsXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvbixcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgdW5zdGFibGVfYmF0Y2hlZFVwZGF0ZXM6IFJlYWN0VXBkYXRlcy5iYXRjaGVkVXBkYXRlcyxcbiAgdW5zdGFibGVfcmVuZGVyU3VidHJlZUludG9Db250YWluZXI6IHJlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyXG59O1xuXG4vLyBJbmplY3QgdGhlIHJ1bnRpbWUgaW50byBhIGRldnRvb2xzIGdsb2JhbCBob29rIHJlZ2FyZGxlc3Mgb2YgYnJvd3Nlci5cbi8vIEFsbG93cyBmb3IgZGVidWdnaW5nIHdoZW4gdGhlIGhvb2sgaXMgaW5qZWN0ZWQgb24gdGhlIHBhZ2UuXG4vKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuaWYgKHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18uaW5qZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5pbmplY3Qoe1xuICAgIEN1cnJlbnRPd25lcjogUmVhY3RDdXJyZW50T3duZXIsXG4gICAgSW5zdGFuY2VIYW5kbGVzOiBSZWFjdEluc3RhbmNlSGFuZGxlcyxcbiAgICBNb3VudDogUmVhY3RNb3VudCxcbiAgICBSZWNvbmNpbGVyOiBSZWFjdFJlY29uY2lsZXIsXG4gICAgVGV4dENvbXBvbmVudDogUmVhY3RET01UZXh0Q29tcG9uZW50XG4gIH0pO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuICBpZiAoRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NICYmIHdpbmRvdy50b3AgPT09IHdpbmRvdy5zZWxmKSB7XG5cbiAgICAvLyBGaXJzdCBjaGVjayBpZiBkZXZ0b29scyBpcyBub3QgaW5zdGFsbGVkXG4gICAgaWYgKHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBJZiB3ZSdyZSBpbiBDaHJvbWUgb3IgRmlyZWZveCwgcHJvdmlkZSBhIGRvd25sb2FkIGxpbmsgaWYgbm90IGluc3RhbGxlZC5cbiAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID4gLTEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdFZGdlJykgPT09IC0xIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpID4gLTEpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZygnRG93bmxvYWQgdGhlIFJlYWN0IERldlRvb2xzIGZvciBhIGJldHRlciBkZXZlbG9wbWVudCBleHBlcmllbmNlOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3QtZGV2dG9vbHMnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB3ZSdyZSBpbiBJRTgsIGNoZWNrIHRvIHNlZSBpZiB3ZSBhcmUgaW4gY29tcGF0aWJpbGl0eSBtb2RlIGFuZCBwcm92aWRlXG4gICAgLy8gaW5mb3JtYXRpb24gb24gcHJldmVudGluZyBjb21wYXRpYmlsaXR5IG1vZGVcbiAgICB2YXIgaWVDb21wYXRpYmlsaXR5TW9kZSA9IGRvY3VtZW50LmRvY3VtZW50TW9kZSAmJiBkb2N1bWVudC5kb2N1bWVudE1vZGUgPCA4O1xuXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWllQ29tcGF0aWJpbGl0eU1vZGUsICdJbnRlcm5ldCBFeHBsb3JlciBpcyBydW5uaW5nIGluIGNvbXBhdGliaWxpdHkgbW9kZTsgcGxlYXNlIGFkZCB0aGUgJyArICdmb2xsb3dpbmcgdGFnIHRvIHlvdXIgSFRNTCB0byBwcmV2ZW50IHRoaXMgZnJvbSBoYXBwZW5pbmc6ICcgKyAnPG1ldGEgaHR0cC1lcXVpdj1cIlgtVUEtQ29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJJRT1lZGdlXCIgLz4nKSA6IHVuZGVmaW5lZDtcblxuICAgIHZhciBleHBlY3RlZEZlYXR1cmVzID0gW1xuICAgIC8vIHNoaW1zXG4gICAgQXJyYXkuaXNBcnJheSwgQXJyYXkucHJvdG90eXBlLmV2ZXJ5LCBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCwgQXJyYXkucHJvdG90eXBlLmluZGV4T2YsIEFycmF5LnByb3RvdHlwZS5tYXAsIERhdGUubm93LCBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCwgT2JqZWN0LmtleXMsIFN0cmluZy5wcm90b3R5cGUuc3BsaXQsIFN0cmluZy5wcm90b3R5cGUudHJpbSxcblxuICAgIC8vIHNoYW1zXG4gICAgT2JqZWN0LmNyZWF0ZSwgT2JqZWN0LmZyZWV6ZV07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkRmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghZXhwZWN0ZWRGZWF0dXJlc1tpXSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdPbmUgb3IgbW9yZSBFUzUgc2hpbS9zaGFtcyBleHBlY3RlZCBieSBSZWFjdCBhcmUgbm90IGF2YWlsYWJsZTogJyArICdodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctcG9seWZpbGxzJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0OyJdfQ==