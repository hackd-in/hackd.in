'use strict';

var getTechnology = function getTechnology(cb) {
  $.get('/technologies', function () {
    console.log('GET request made to /technologies');
  }).done(function (data) {
    console.log('technology: ', data);
    cb(data);
  }).fail(function (err) {
    console.log(err);
  });
};

var postTechnology = function postTechnology(data) {
  $.post('/technologies', data, function () {
    console.log('POST request made to /technologies');
  }).done(function (data) {
    console.log(data);
  }).fail(function (err) {
    console.log(err);
  });
};

window.getTechnology = getTechnology;
window.postTechnology = postTechnology;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9zcmMvdXRpbHMvdGVjaG5vbG9neUhlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLGdCQUFnQixTQUFoQixhQUFnQixLQUFNO0FBQzFCLElBQUUsR0FBRixDQUFNLGVBQU4sRUFBdUIsWUFBTTtBQUMzQixZQUFRLEdBQVIsQ0FBWSxtQ0FBWjtBQUNELEdBRkQsRUFHQyxJQUhELENBR08sZ0JBQVE7QUFDYixZQUFRLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLElBQTVCO0FBQ0EsT0FBRyxJQUFIO0FBQ0QsR0FORCxFQU9DLElBUEQsQ0FPTyxlQUFPO0FBQ1osWUFBUSxHQUFSLENBQVksR0FBWjtBQUNELEdBVEQ7QUFVRCxDQVhEOztBQWFBLElBQU0saUJBQWlCLFNBQWpCLGNBQWlCLE9BQVE7QUFDN0IsSUFBRSxJQUFGLENBQU8sZUFBUCxFQUF3QixJQUF4QixFQUE4QixZQUFNO0FBQ2xDLFlBQVEsR0FBUixDQUFZLG9DQUFaO0FBQ0QsR0FGRCxFQUdDLElBSEQsQ0FHTyxnQkFBUTtBQUNiLFlBQVEsR0FBUixDQUFZLElBQVo7QUFDRCxHQUxELEVBTUMsSUFORCxDQU1PLGVBQU87QUFDWixZQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0QsR0FSRDtBQVNELENBVkQ7O0FBWUEsT0FBTyxhQUFQLEdBQXVCLGFBQXZCO0FBQ0EsT0FBTyxjQUFQLEdBQXdCLGNBQXhCIiwiZmlsZSI6InRlY2hub2xvZ3lIZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0VGVjaG5vbG9neSA9IGNiID0+IHtcbiAgJC5nZXQoJy90ZWNobm9sb2dpZXMnLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0dFVCByZXF1ZXN0IG1hZGUgdG8gL3RlY2hub2xvZ2llcycpO1xuICB9KVxuICAuZG9uZSggZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3RlY2hub2xvZ3k6ICcsIGRhdGEpO1xuICAgIGNiKGRhdGEpO1xuICB9KVxuICAuZmFpbCggZXJyID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KTtcbn07XG5cbmNvbnN0IHBvc3RUZWNobm9sb2d5ID0gZGF0YSA9PiB7XG4gICQucG9zdCgnL3RlY2hub2xvZ2llcycsIGRhdGEsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnUE9TVCByZXF1ZXN0IG1hZGUgdG8gL3RlY2hub2xvZ2llcycpO1xuICB9KVxuICAuZG9uZSggZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gIH0pXG4gIC5mYWlsKCBlcnIgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pO1xufTtcblxud2luZG93LmdldFRlY2hub2xvZ3kgPSBnZXRUZWNobm9sb2d5O1xud2luZG93LnBvc3RUZWNobm9sb2d5ID0gcG9zdFRlY2hub2xvZ3k7XG4iXX0=