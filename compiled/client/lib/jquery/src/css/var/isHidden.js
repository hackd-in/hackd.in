"use strict";

define(["../../core", "../../selector"

// css is assumed
], function (jQuery) {

	return function (elem, el) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvanF1ZXJ5L3NyYy9jc3MvdmFyL2lzSGlkZGVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBUSxDQUNQLFlBRE8sRUFFUDs7O0FBRk8sQ0FBUixFQUtHLFVBQVUsTUFBVixFQUFtQjs7QUFFckIsUUFBTyxVQUFVLElBQVYsRUFBZ0IsRUFBaEIsRUFBcUI7Ozs7QUFJM0IsU0FBTyxNQUFNLElBQU4sQ0FKb0I7QUFLM0IsU0FBTyxPQUFPLEdBQVAsQ0FBWSxJQUFaLEVBQWtCLFNBQWxCLE1BQWtDLE1BQWxDLElBQ04sQ0FBQyxPQUFPLFFBQVAsQ0FBaUIsS0FBSyxhQUFMLEVBQW9CLElBQXJDLENBQUQsQ0FOMEI7RUFBckIsQ0FGYztDQUFuQixDQUxIIiwiZmlsZSI6ImlzSGlkZGVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi4vLi4vY29yZVwiLFxuXHRcIi4uLy4uL3NlbGVjdG9yXCJcblxuXHQvLyBjc3MgaXMgYXNzdW1lZFxuXSwgZnVuY3Rpb24oIGpRdWVyeSApIHtcblxuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0sIGVsICkge1xuXG5cdFx0Ly8gaXNIaWRkZW4gbWlnaHQgYmUgY2FsbGVkIGZyb20galF1ZXJ5I2ZpbHRlciBmdW5jdGlvbjtcblx0XHQvLyBpbiB0aGF0IGNhc2UsIGVsZW1lbnQgd2lsbCBiZSBzZWNvbmQgYXJndW1lbnRcblx0XHRlbGVtID0gZWwgfHwgZWxlbTtcblx0XHRyZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCIgfHxcblx0XHRcdCFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXHR9O1xufSApO1xuIl19