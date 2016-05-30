'use strict';

var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isHostObject = require('./_isHostObject'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

module.exports = baseIsEqualDeep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL19iYXNlSXNFcXVhbERlZXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFFBQVEsUUFBUSxVQUFSLENBQVI7SUFDQSxjQUFjLFFBQVEsZ0JBQVIsQ0FBZDtJQUNBLGFBQWEsUUFBUSxlQUFSLENBQWI7SUFDQSxlQUFlLFFBQVEsaUJBQVIsQ0FBZjtJQUNBLFNBQVMsUUFBUSxXQUFSLENBQVQ7SUFDQSxVQUFVLFFBQVEsV0FBUixDQUFWO0lBQ0EsZUFBZSxRQUFRLGlCQUFSLENBQWY7SUFDQSxlQUFlLFFBQVEsZ0JBQVIsQ0FBZjs7O0FBR0osSUFBSSx1QkFBdUIsQ0FBdkI7OztBQUdKLElBQUksVUFBVSxvQkFBVjtJQUNBLFdBQVcsZ0JBQVg7SUFDQSxZQUFZLGlCQUFaOzs7QUFHSixJQUFJLGNBQWMsT0FBTyxTQUFQOzs7QUFHbEIsSUFBSSxpQkFBaUIsWUFBWSxjQUFaOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCckIsU0FBUyxlQUFULENBQXlCLE1BQXpCLEVBQWlDLEtBQWpDLEVBQXdDLFNBQXhDLEVBQW1ELFVBQW5ELEVBQStELE9BQS9ELEVBQXdFLEtBQXhFLEVBQStFO0FBQzdFLE1BQUksV0FBVyxRQUFRLE1BQVIsQ0FBWDtNQUNBLFdBQVcsUUFBUSxLQUFSLENBQVg7TUFDQSxTQUFTLFFBQVQ7TUFDQSxTQUFTLFFBQVQsQ0FKeUU7O0FBTTdFLE1BQUksQ0FBQyxRQUFELEVBQVc7QUFDYixhQUFTLE9BQU8sTUFBUCxDQUFULENBRGE7QUFFYixhQUFTLFVBQVUsT0FBVixHQUFvQixTQUFwQixHQUFnQyxNQUFoQyxDQUZJO0dBQWY7QUFJQSxNQUFJLENBQUMsUUFBRCxFQUFXO0FBQ2IsYUFBUyxPQUFPLEtBQVAsQ0FBVCxDQURhO0FBRWIsYUFBUyxVQUFVLE9BQVYsR0FBb0IsU0FBcEIsR0FBZ0MsTUFBaEMsQ0FGSTtHQUFmO0FBSUEsTUFBSSxXQUFXLFVBQVUsU0FBVixJQUF1QixDQUFDLGFBQWEsTUFBYixDQUFEO01BQ2xDLFdBQVcsVUFBVSxTQUFWLElBQXVCLENBQUMsYUFBYSxLQUFiLENBQUQ7TUFDbEMsWUFBWSxVQUFVLE1BQVYsQ0FoQjZEOztBQWtCN0UsTUFBSSxhQUFhLENBQUMsUUFBRCxFQUFXO0FBQzFCLGNBQVUsUUFBUSxJQUFJLEtBQUosRUFBUixDQUFWLENBRDBCO0FBRTFCLFdBQU8sUUFBQyxJQUFZLGFBQWEsTUFBYixDQUFaLEdBQ0osWUFBWSxNQUFaLEVBQW9CLEtBQXBCLEVBQTJCLFNBQTNCLEVBQXNDLFVBQXRDLEVBQWtELE9BQWxELEVBQTJELEtBQTNELENBREcsR0FFSCxXQUFXLE1BQVgsRUFBbUIsS0FBbkIsRUFBMEIsTUFBMUIsRUFBa0MsU0FBbEMsRUFBNkMsVUFBN0MsRUFBeUQsT0FBekQsRUFBa0UsS0FBbEUsQ0FGRyxDQUZtQjtHQUE1QjtBQU1BLE1BQUksRUFBRSxVQUFVLG9CQUFWLENBQUYsRUFBbUM7QUFDckMsUUFBSSxlQUFlLFlBQVksZUFBZSxJQUFmLENBQW9CLE1BQXBCLEVBQTRCLGFBQTVCLENBQVo7UUFDZixlQUFlLFlBQVksZUFBZSxJQUFmLENBQW9CLEtBQXBCLEVBQTJCLGFBQTNCLENBQVosQ0FGa0I7O0FBSXJDLFFBQUksZ0JBQWdCLFlBQWhCLEVBQThCO0FBQ2hDLFVBQUksZUFBZSxlQUFlLE9BQU8sS0FBUCxFQUFmLEdBQWdDLE1BQWhDO1VBQ2YsZUFBZSxlQUFlLE1BQU0sS0FBTixFQUFmLEdBQStCLEtBQS9CLENBRmE7O0FBSWhDLGdCQUFVLFFBQVEsSUFBSSxLQUFKLEVBQVIsQ0FBVixDQUpnQztBQUtoQyxhQUFPLFVBQVUsWUFBVixFQUF3QixZQUF4QixFQUFzQyxVQUF0QyxFQUFrRCxPQUFsRCxFQUEyRCxLQUEzRCxDQUFQLENBTGdDO0tBQWxDO0dBSkY7QUFZQSxNQUFJLENBQUMsU0FBRCxFQUFZO0FBQ2QsV0FBTyxLQUFQLENBRGM7R0FBaEI7QUFHQSxZQUFVLFFBQVEsSUFBSSxLQUFKLEVBQVIsQ0FBVixDQXZDNkU7QUF3QzdFLFNBQU8sYUFBYSxNQUFiLEVBQXFCLEtBQXJCLEVBQTRCLFNBQTVCLEVBQXVDLFVBQXZDLEVBQW1ELE9BQW5ELEVBQTRELEtBQTVELENBQVAsQ0F4QzZFO0NBQS9FOztBQTJDQSxPQUFPLE9BQVAsR0FBaUIsZUFBakIiLCJmaWxlIjoiX2Jhc2VJc0VxdWFsRGVlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBTdGFjayA9IHJlcXVpcmUoJy4vX1N0YWNrJyksXG4gICAgZXF1YWxBcnJheXMgPSByZXF1aXJlKCcuL19lcXVhbEFycmF5cycpLFxuICAgIGVxdWFsQnlUYWcgPSByZXF1aXJlKCcuL19lcXVhbEJ5VGFnJyksXG4gICAgZXF1YWxPYmplY3RzID0gcmVxdWlyZSgnLi9fZXF1YWxPYmplY3RzJyksXG4gICAgZ2V0VGFnID0gcmVxdWlyZSgnLi9fZ2V0VGFnJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzSG9zdE9iamVjdCA9IHJlcXVpcmUoJy4vX2lzSG9zdE9iamVjdCcpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vaXNUeXBlZEFycmF5Jyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNvbXBhcmlzb24gc3R5bGVzLiAqL1xudmFyIFBBUlRJQUxfQ09NUEFSRV9GTEFHID0gMjtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gW2JpdG1hc2tdIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gZ2V0VGFnKG9iamVjdCk7XG4gICAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IGdldFRhZyhvdGhlcik7XG4gICAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyAmJiAhaXNIb3N0T2JqZWN0KG9iamVjdCksXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcgJiYgIWlzSG9zdE9iamVjdChvdGhlciksXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgIW9iaklzT2JqKSB7XG4gICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICByZXR1cm4gKG9iaklzQXJyIHx8IGlzVHlwZWRBcnJheShvYmplY3QpKVxuICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKVxuICAgICAgOiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gIH1cbiAgaWYgKCEoYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHKSkge1xuICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgIHZhciBvYmpVbndyYXBwZWQgPSBvYmpJc1dyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCxcbiAgICAgICAgICBvdGhVbndyYXBwZWQgPSBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXI7XG5cbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9ialVud3JhcHBlZCwgb3RoVW53cmFwcGVkLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgfVxuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHJldHVybiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWxEZWVwO1xuIl19