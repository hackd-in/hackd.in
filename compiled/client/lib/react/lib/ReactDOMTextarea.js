/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMTextarea
 */

'use strict';

var LinkedValueUtils = require('./LinkedValueUtils');
var ReactDOMIDOperations = require('./ReactDOMIDOperations');
var ReactUpdates = require('./ReactUpdates');

var assign = require('./Object.assign');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

function forceUpdateIfMounted() {
  if (this._rootNodeID) {
    // DOM component is still mounted; update
    ReactDOMTextarea.updateWrapper(this);
  }
}

/**
 * Implements a <textarea> native component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */
var ReactDOMTextarea = {
  getNativeProps: function getNativeProps(inst, props, context) {
    !(props.dangerouslySetInnerHTML == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : invariant(false) : undefined;

    // Always set children to the same thing. In IE9, the selection range will
    // get reset if `textContent` is mutated.
    var nativeProps = assign({}, props, {
      defaultValue: undefined,
      value: undefined,
      children: inst._wrapperState.initialValue,
      onChange: inst._wrapperState.onChange
    });

    return nativeProps;
  },

  mountWrapper: function mountWrapper(inst, props) {
    if (process.env.NODE_ENV !== 'production') {
      LinkedValueUtils.checkPropTypes('textarea', props, inst._currentElement._owner);
    }

    var defaultValue = props.defaultValue;
    // TODO (yungsters): Remove support for children content in <textarea>.
    var children = props.children;
    if (children != null) {
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : undefined;
      }
      !(defaultValue == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : invariant(false) : undefined;
      if (Array.isArray(children)) {
        !(children.length <= 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : invariant(false) : undefined;
        children = children[0];
      }

      defaultValue = '' + children;
    }
    if (defaultValue == null) {
      defaultValue = '';
    }
    var value = LinkedValueUtils.getValue(props);

    inst._wrapperState = {
      // We save the initial value so that `ReactDOMComponent` doesn't update
      // `textContent` (unnecessary since we update value).
      // The initial value can be a boolean or object so that's why it's
      // forced to be a string.
      initialValue: '' + (value != null ? value : defaultValue),
      onChange: _handleChange.bind(inst)
    };
  },

  updateWrapper: function updateWrapper(inst) {
    var props = inst._currentElement.props;
    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
    }
  }
};

function _handleChange(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);
  ReactUpdates.asap(forceUpdateIfMounted, this);
  return returnValue;
}

module.exports = ReactDOMTextarea;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1JlYWN0RE9NVGV4dGFyZWEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxJQUFJLG1CQUFtQixRQUFRLG9CQUFSLENBQW5CO0FBQ0osSUFBSSx1QkFBdUIsUUFBUSx3QkFBUixDQUF2QjtBQUNKLElBQUksZUFBZSxRQUFRLGdCQUFSLENBQWY7O0FBRUosSUFBSSxTQUFTLFFBQVEsaUJBQVIsQ0FBVDtBQUNKLElBQUksWUFBWSxRQUFRLG9CQUFSLENBQVo7QUFDSixJQUFJLFVBQVUsUUFBUSxrQkFBUixDQUFWOztBQUVKLFNBQVMsb0JBQVQsR0FBZ0M7QUFDOUIsTUFBSSxLQUFLLFdBQUwsRUFBa0I7O0FBRXBCLHFCQUFpQixhQUFqQixDQUErQixJQUEvQixFQUZvQjtHQUF0QjtDQURGOzs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxJQUFJLG1CQUFtQjtBQUNyQixrQkFBZ0Isd0JBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QixPQUF2QixFQUFnQztBQUM5QyxNQUFFLE1BQU0sdUJBQU4sSUFBaUMsSUFBakMsQ0FBRixHQUEyQyxRQUFRLEdBQVIsQ0FBWSxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDLFVBQVUsS0FBVixFQUFpQiw4REFBakIsQ0FBeEMsR0FBMkgsVUFBVSxLQUFWLENBQTNILEdBQThJLFNBQXpMOzs7O0FBRDhDLFFBSzFDLGNBQWMsT0FBTyxFQUFQLEVBQVcsS0FBWCxFQUFrQjtBQUNsQyxvQkFBYyxTQUFkO0FBQ0EsYUFBTyxTQUFQO0FBQ0EsZ0JBQVUsS0FBSyxhQUFMLENBQW1CLFlBQW5CO0FBQ1YsZ0JBQVUsS0FBSyxhQUFMLENBQW1CLFFBQW5CO0tBSk0sQ0FBZCxDQUwwQzs7QUFZOUMsV0FBTyxXQUFQLENBWjhDO0dBQWhDOztBQWVoQixnQkFBYyxzQkFBVSxJQUFWLEVBQWdCLEtBQWhCLEVBQXVCO0FBQ25DLFFBQUksUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUF6QixFQUF1QztBQUN6Qyx1QkFBaUIsY0FBakIsQ0FBZ0MsVUFBaEMsRUFBNEMsS0FBNUMsRUFBbUQsS0FBSyxlQUFMLENBQXFCLE1BQXJCLENBQW5ELENBRHlDO0tBQTNDOztBQUlBLFFBQUksZUFBZSxNQUFNLFlBQU47O0FBTGdCLFFBTy9CLFdBQVcsTUFBTSxRQUFOLENBUG9CO0FBUW5DLFFBQUksWUFBWSxJQUFaLEVBQWtCO0FBQ3BCLFVBQUksUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUF6QixFQUF1QztBQUN6QyxnQkFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUF6QixHQUF3QyxRQUFRLEtBQVIsRUFBZSxnRUFBZ0UseUJBQWhFLENBQXZELEdBQW9KLFNBQXBKLENBRHlDO09BQTNDO0FBR0EsUUFBRSxnQkFBZ0IsSUFBaEIsQ0FBRixHQUEwQixRQUFRLEdBQVIsQ0FBWSxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDLFVBQVUsS0FBVixFQUFpQixxRUFBakIsQ0FBeEMsR0FBa0ksVUFBVSxLQUFWLENBQWxJLEdBQXFKLFNBQS9LLENBSm9CO0FBS3BCLFVBQUksTUFBTSxPQUFOLENBQWMsUUFBZCxDQUFKLEVBQTZCO0FBQzNCLFVBQUUsU0FBUyxNQUFULElBQW1CLENBQW5CLENBQUYsR0FBMEIsUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUF6QixHQUF3QyxVQUFVLEtBQVYsRUFBaUIsNkNBQWpCLENBQXhDLEdBQTBHLFVBQVUsS0FBVixDQUExRyxHQUE2SCxTQUF2SixDQUQyQjtBQUUzQixtQkFBVyxTQUFTLENBQVQsQ0FBWCxDQUYyQjtPQUE3Qjs7QUFLQSxxQkFBZSxLQUFLLFFBQUwsQ0FWSztLQUF0QjtBQVlBLFFBQUksZ0JBQWdCLElBQWhCLEVBQXNCO0FBQ3hCLHFCQUFlLEVBQWYsQ0FEd0I7S0FBMUI7QUFHQSxRQUFJLFFBQVEsaUJBQWlCLFFBQWpCLENBQTBCLEtBQTFCLENBQVIsQ0F2QitCOztBQXlCbkMsU0FBSyxhQUFMLEdBQXFCOzs7OztBQUtuQixvQkFBYyxNQUFNLFNBQVMsSUFBVCxHQUFnQixLQUFoQixHQUF3QixZQUF4QixDQUFOO0FBQ2QsZ0JBQVUsY0FBYyxJQUFkLENBQW1CLElBQW5CLENBQVY7S0FORixDQXpCbUM7R0FBdkI7O0FBbUNkLGlCQUFlLHVCQUFVLElBQVYsRUFBZ0I7QUFDN0IsUUFBSSxRQUFRLEtBQUssZUFBTCxDQUFxQixLQUFyQixDQURpQjtBQUU3QixRQUFJLFFBQVEsaUJBQWlCLFFBQWpCLENBQTBCLEtBQTFCLENBQVIsQ0FGeUI7QUFHN0IsUUFBSSxTQUFTLElBQVQsRUFBZTs7O0FBR2pCLDJCQUFxQixrQkFBckIsQ0FBd0MsS0FBSyxXQUFMLEVBQWtCLE9BQTFELEVBQW1FLEtBQUssS0FBTCxDQUFuRSxDQUhpQjtLQUFuQjtHQUhhO0NBbkRiOztBQThESixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEI7QUFDNUIsTUFBSSxRQUFRLEtBQUssZUFBTCxDQUFxQixLQUFyQixDQURnQjtBQUU1QixNQUFJLGNBQWMsaUJBQWlCLGVBQWpCLENBQWlDLEtBQWpDLEVBQXdDLEtBQXhDLENBQWQsQ0FGd0I7QUFHNUIsZUFBYSxJQUFiLENBQWtCLG9CQUFsQixFQUF3QyxJQUF4QyxFQUg0QjtBQUk1QixTQUFPLFdBQVAsQ0FKNEI7Q0FBOUI7O0FBT0EsT0FBTyxPQUFQLEdBQWlCLGdCQUFqQiIsImZpbGUiOiJSZWFjdERPTVRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RE9NVGV4dGFyZWFcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaW5rZWRWYWx1ZVV0aWxzID0gcmVxdWlyZSgnLi9MaW5rZWRWYWx1ZVV0aWxzJyk7XG52YXIgUmVhY3RET01JRE9wZXJhdGlvbnMgPSByZXF1aXJlKCcuL1JlYWN0RE9NSURPcGVyYXRpb25zJyk7XG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgnLi9SZWFjdFVwZGF0ZXMnKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vT2JqZWN0LmFzc2lnbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGZvcmNlVXBkYXRlSWZNb3VudGVkKCkge1xuICBpZiAodGhpcy5fcm9vdE5vZGVJRCkge1xuICAgIC8vIERPTSBjb21wb25lbnQgaXMgc3RpbGwgbW91bnRlZDsgdXBkYXRlXG4gICAgUmVhY3RET01UZXh0YXJlYS51cGRhdGVXcmFwcGVyKHRoaXMpO1xuICB9XG59XG5cbi8qKlxuICogSW1wbGVtZW50cyBhIDx0ZXh0YXJlYT4gbmF0aXZlIGNvbXBvbmVudCB0aGF0IGFsbG93cyBzZXR0aW5nIGB2YWx1ZWAsIGFuZFxuICogYGRlZmF1bHRWYWx1ZWAuIFRoaXMgZGlmZmVycyBmcm9tIHRoZSB0cmFkaXRpb25hbCBET00gQVBJIGJlY2F1c2UgdmFsdWUgaXNcbiAqIHVzdWFsbHkgc2V0IGFzIFBDREFUQSBjaGlsZHJlbi5cbiAqXG4gKiBJZiBgdmFsdWVgIGlzIG5vdCBzdXBwbGllZCAob3IgbnVsbC91bmRlZmluZWQpLCB1c2VyIGFjdGlvbnMgdGhhdCBhZmZlY3QgdGhlXG4gKiB2YWx1ZSB3aWxsIHRyaWdnZXIgdXBkYXRlcyB0byB0aGUgZWxlbWVudC5cbiAqXG4gKiBJZiBgdmFsdWVgIGlzIHN1cHBsaWVkIChhbmQgbm90IG51bGwvdW5kZWZpbmVkKSwgdGhlIHJlbmRlcmVkIGVsZW1lbnQgd2lsbFxuICogbm90IHRyaWdnZXIgdXBkYXRlcyB0byB0aGUgZWxlbWVudC4gSW5zdGVhZCwgdGhlIGB2YWx1ZWAgcHJvcCBtdXN0IGNoYW5nZSBpblxuICogb3JkZXIgZm9yIHRoZSByZW5kZXJlZCBlbGVtZW50IHRvIGJlIHVwZGF0ZWQuXG4gKlxuICogVGhlIHJlbmRlcmVkIGVsZW1lbnQgd2lsbCBiZSBpbml0aWFsaXplZCB3aXRoIGFuIGVtcHR5IHZhbHVlLCB0aGUgcHJvcFxuICogYGRlZmF1bHRWYWx1ZWAgaWYgc3BlY2lmaWVkLCBvciB0aGUgY2hpbGRyZW4gY29udGVudCAoZGVwcmVjYXRlZCkuXG4gKi9cbnZhciBSZWFjdERPTVRleHRhcmVhID0ge1xuICBnZXROYXRpdmVQcm9wczogZnVuY3Rpb24gKGluc3QsIHByb3BzLCBjb250ZXh0KSB7XG4gICAgIShwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxgIGRvZXMgbm90IG1ha2Ugc2Vuc2Ugb24gPHRleHRhcmVhPi4nKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBBbHdheXMgc2V0IGNoaWxkcmVuIHRvIHRoZSBzYW1lIHRoaW5nLiBJbiBJRTksIHRoZSBzZWxlY3Rpb24gcmFuZ2Ugd2lsbFxuICAgIC8vIGdldCByZXNldCBpZiBgdGV4dENvbnRlbnRgIGlzIG11dGF0ZWQuXG4gICAgdmFyIG5hdGl2ZVByb3BzID0gYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgY2hpbGRyZW46IGluc3QuX3dyYXBwZXJTdGF0ZS5pbml0aWFsVmFsdWUsXG4gICAgICBvbkNoYW5nZTogaW5zdC5fd3JhcHBlclN0YXRlLm9uQ2hhbmdlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmF0aXZlUHJvcHM7XG4gIH0sXG5cbiAgbW91bnRXcmFwcGVyOiBmdW5jdGlvbiAoaW5zdCwgcHJvcHMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgTGlua2VkVmFsdWVVdGlscy5jaGVja1Byb3BUeXBlcygndGV4dGFyZWEnLCBwcm9wcywgaW5zdC5fY3VycmVudEVsZW1lbnQuX293bmVyKTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdFZhbHVlID0gcHJvcHMuZGVmYXVsdFZhbHVlO1xuICAgIC8vIFRPRE8gKHl1bmdzdGVycyk6IFJlbW92ZSBzdXBwb3J0IGZvciBjaGlsZHJlbiBjb250ZW50IGluIDx0ZXh0YXJlYT4uXG4gICAgdmFyIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW47XG4gICAgaWYgKGNoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnVXNlIHRoZSBgZGVmYXVsdFZhbHVlYCBvciBgdmFsdWVgIHByb3BzIGluc3RlYWQgb2Ygc2V0dGluZyAnICsgJ2NoaWxkcmVuIG9uIDx0ZXh0YXJlYT4uJykgOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICAhKGRlZmF1bHRWYWx1ZSA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdJZiB5b3Ugc3VwcGx5IGBkZWZhdWx0VmFsdWVgIG9uIGEgPHRleHRhcmVhPiwgZG8gbm90IHBhc3MgY2hpbGRyZW4uJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICEoY2hpbGRyZW4ubGVuZ3RoIDw9IDEpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJzx0ZXh0YXJlYT4gY2FuIG9ubHkgaGF2ZSBhdCBtb3N0IG9uZSBjaGlsZC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNoaWxkcmVuID0gY2hpbGRyZW5bMF07XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICcnICsgY2hpbGRyZW47XG4gICAgfVxuICAgIGlmIChkZWZhdWx0VmFsdWUgPT0gbnVsbCkge1xuICAgICAgZGVmYXVsdFZhbHVlID0gJyc7XG4gICAgfVxuICAgIHZhciB2YWx1ZSA9IExpbmtlZFZhbHVlVXRpbHMuZ2V0VmFsdWUocHJvcHMpO1xuXG4gICAgaW5zdC5fd3JhcHBlclN0YXRlID0ge1xuICAgICAgLy8gV2Ugc2F2ZSB0aGUgaW5pdGlhbCB2YWx1ZSBzbyB0aGF0IGBSZWFjdERPTUNvbXBvbmVudGAgZG9lc24ndCB1cGRhdGVcbiAgICAgIC8vIGB0ZXh0Q29udGVudGAgKHVubmVjZXNzYXJ5IHNpbmNlIHdlIHVwZGF0ZSB2YWx1ZSkuXG4gICAgICAvLyBUaGUgaW5pdGlhbCB2YWx1ZSBjYW4gYmUgYSBib29sZWFuIG9yIG9iamVjdCBzbyB0aGF0J3Mgd2h5IGl0J3NcbiAgICAgIC8vIGZvcmNlZCB0byBiZSBhIHN0cmluZy5cbiAgICAgIGluaXRpYWxWYWx1ZTogJycgKyAodmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogZGVmYXVsdFZhbHVlKSxcbiAgICAgIG9uQ2hhbmdlOiBfaGFuZGxlQ2hhbmdlLmJpbmQoaW5zdClcbiAgICB9O1xuICB9LFxuXG4gIHVwZGF0ZVdyYXBwZXI6IGZ1bmN0aW9uIChpbnN0KSB7XG4gICAgdmFyIHByb3BzID0gaW5zdC5fY3VycmVudEVsZW1lbnQucHJvcHM7XG4gICAgdmFyIHZhbHVlID0gTGlua2VkVmFsdWVVdGlscy5nZXRWYWx1ZShwcm9wcyk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIC8vIENhc3QgYHZhbHVlYCB0byBhIHN0cmluZyB0byBlbnN1cmUgdGhlIHZhbHVlIGlzIHNldCBjb3JyZWN0bHkuIFdoaWxlXG4gICAgICAvLyBicm93c2VycyB0eXBpY2FsbHkgZG8gdGhpcyBhcyBuZWNlc3NhcnksIGpzZG9tIGRvZXNuJ3QuXG4gICAgICBSZWFjdERPTUlET3BlcmF0aW9ucy51cGRhdGVQcm9wZXJ0eUJ5SUQoaW5zdC5fcm9vdE5vZGVJRCwgJ3ZhbHVlJywgJycgKyB2YWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBfaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XG4gIHZhciBwcm9wcyA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnByb3BzO1xuICB2YXIgcmV0dXJuVmFsdWUgPSBMaW5rZWRWYWx1ZVV0aWxzLmV4ZWN1dGVPbkNoYW5nZShwcm9wcywgZXZlbnQpO1xuICBSZWFjdFVwZGF0ZXMuYXNhcChmb3JjZVVwZGF0ZUlmTW91bnRlZCwgdGhpcyk7XG4gIHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTVRleHRhcmVhOyJdfQ==