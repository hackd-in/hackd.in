/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentBrowserEnvironment
 */

'use strict';

var ReactDOMIDOperations = require('./ReactDOMIDOperations');
var ReactMount = require('./ReactMount');

/**
 * Abstracts away all functionality of the reconciler that requires knowledge of
 * the browser context. TODO: These callers should be refactored to avoid the
 * need for this injection.
 */
var ReactComponentBrowserEnvironment = {

  processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,

  replaceNodeWithMarkupByID: ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,

  /**
   * If a particular environment requires that some resources be cleaned up,
   * specify this in the injected Mixin. In the DOM, we would likely want to
   * purge any cached node ID lookups.
   *
   * @private
   */
  unmountIDFromEnvironment: function unmountIDFromEnvironment(rootNodeID) {
    ReactMount.purgeID(rootNodeID);
  }

};

module.exports = ReactComponentBrowserEnvironment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50QnJvd3NlckVudmlyb25tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsSUFBSSx1QkFBdUIsUUFBUSx3QkFBUixDQUF2QjtBQUNKLElBQUksYUFBYSxRQUFRLGNBQVIsQ0FBYjs7Ozs7OztBQU9KLElBQUksbUNBQW1DOztBQUVyQywwQkFBd0IscUJBQXFCLGlDQUFyQjs7QUFFeEIsNkJBQTJCLHFCQUFxQixvQ0FBckI7Ozs7Ozs7OztBQVMzQiw0QkFBMEIsa0NBQVUsVUFBVixFQUFzQjtBQUM5QyxlQUFXLE9BQVgsQ0FBbUIsVUFBbkIsRUFEOEM7R0FBdEI7O0NBYnhCOztBQW1CSixPQUFPLE9BQVAsR0FBaUIsZ0NBQWpCIiwiZmlsZSI6IlJlYWN0Q29tcG9uZW50QnJvd3NlckVudmlyb25tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9uZW50QnJvd3NlckVudmlyb25tZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RET01JRE9wZXJhdGlvbnMgPSByZXF1aXJlKCcuL1JlYWN0RE9NSURPcGVyYXRpb25zJyk7XG52YXIgUmVhY3RNb3VudCA9IHJlcXVpcmUoJy4vUmVhY3RNb3VudCcpO1xuXG4vKipcbiAqIEFic3RyYWN0cyBhd2F5IGFsbCBmdW5jdGlvbmFsaXR5IG9mIHRoZSByZWNvbmNpbGVyIHRoYXQgcmVxdWlyZXMga25vd2xlZGdlIG9mXG4gKiB0aGUgYnJvd3NlciBjb250ZXh0LiBUT0RPOiBUaGVzZSBjYWxsZXJzIHNob3VsZCBiZSByZWZhY3RvcmVkIHRvIGF2b2lkIHRoZVxuICogbmVlZCBmb3IgdGhpcyBpbmplY3Rpb24uXG4gKi9cbnZhciBSZWFjdENvbXBvbmVudEJyb3dzZXJFbnZpcm9ubWVudCA9IHtcblxuICBwcm9jZXNzQ2hpbGRyZW5VcGRhdGVzOiBSZWFjdERPTUlET3BlcmF0aW9ucy5kYW5nZXJvdXNseVByb2Nlc3NDaGlsZHJlblVwZGF0ZXMsXG5cbiAgcmVwbGFjZU5vZGVXaXRoTWFya3VwQnlJRDogUmVhY3RET01JRE9wZXJhdGlvbnMuZGFuZ2Vyb3VzbHlSZXBsYWNlTm9kZVdpdGhNYXJrdXBCeUlELFxuXG4gIC8qKlxuICAgKiBJZiBhIHBhcnRpY3VsYXIgZW52aXJvbm1lbnQgcmVxdWlyZXMgdGhhdCBzb21lIHJlc291cmNlcyBiZSBjbGVhbmVkIHVwLFxuICAgKiBzcGVjaWZ5IHRoaXMgaW4gdGhlIGluamVjdGVkIE1peGluLiBJbiB0aGUgRE9NLCB3ZSB3b3VsZCBsaWtlbHkgd2FudCB0b1xuICAgKiBwdXJnZSBhbnkgY2FjaGVkIG5vZGUgSUQgbG9va3Vwcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHVubW91bnRJREZyb21FbnZpcm9ubWVudDogZnVuY3Rpb24gKHJvb3ROb2RlSUQpIHtcbiAgICBSZWFjdE1vdW50LnB1cmdlSUQocm9vdE5vZGVJRCk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudEJyb3dzZXJFbnZpcm9ubWVudDsiXX0=