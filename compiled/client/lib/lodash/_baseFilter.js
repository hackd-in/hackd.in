'use strict';

var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function (value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9saWIvbG9kYXNoL19iYXNlRmlsdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxXQUFXLFFBQVEsYUFBUixDQUFYOzs7Ozs7Ozs7O0FBVUosU0FBUyxVQUFULENBQW9CLFVBQXBCLEVBQWdDLFNBQWhDLEVBQTJDO0FBQ3pDLE1BQUksU0FBUyxFQUFULENBRHFDO0FBRXpDLFdBQVMsVUFBVCxFQUFxQixVQUFTLEtBQVQsRUFBZ0IsS0FBaEIsRUFBdUIsVUFBdkIsRUFBbUM7QUFDdEQsUUFBSSxVQUFVLEtBQVYsRUFBaUIsS0FBakIsRUFBd0IsVUFBeEIsQ0FBSixFQUF5QztBQUN2QyxhQUFPLElBQVAsQ0FBWSxLQUFaLEVBRHVDO0tBQXpDO0dBRG1CLENBQXJCLENBRnlDO0FBT3pDLFNBQU8sTUFBUCxDQVB5QztDQUEzQzs7QUFVQSxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiX2Jhc2VGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUVhY2ggPSByZXF1aXJlKCcuL19iYXNlRWFjaCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbHRlcmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmlsdGVyKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZpbHRlcjtcbiJdfQ==