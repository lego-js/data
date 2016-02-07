(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DATA_KEY = undefined;

exports.default = function (elem, key, value) {
    // die if elem null
    if (!elem) return;

    // get data cache
    var data = elem[DATA_KEY] = elem[DATA_KEY] || {};

    // assign multiple values to cache if key is an object
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
        return (0, _assign2.default)(data, key);
    }

    // set value if value is defined
    if (typeof value !== 'undefined') {
        return data[key] = value;
    }

    // get all data values if key is not defined
    if (typeof key === 'undefined') {
        var _ret = function () {
            // if dataset has already been processed, return data cache
            if (data[DATA_KEY] === true) return {
                v: data
            };
            data[DATA_KEY] = true;

            // use native dataset if supported
            if (elem.dataset) {
                // any existing data in cache takes precedence over dataset
                return {
                    v: data = (0, _assign2.default)({}, elem.dataset, data)
                };
            }

            // find element attributes that start with 'data-' and assign their value to data cache with a camelCase key
            var dataset = {};
            Object.keys(elem.attributes).filter(function (key) {
                return elem.attributes[key].indexOf('data-') === 0;
            }).forEach(function (key) {
                dataset[(0, _string.camelCase)(key.replace('data-', ''))] = elem.getAttribute(key);
            });
            // any existing data in cache takes precedence over dataset
            return {
                v: data = (0, _assign2.default)({}, dataset, data)
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    // check if a value has already been placed in cache for provided key
    if (typeof data[key] === 'undefined') {
        // check dataset (or attribute if dataset not supported) and attempt to set cache value
        return data[key] = elem.dataset ? elem.dataset[key] : elem.getAttribute('data-' + (0, _string.kebabCase)(key));
    }

    return data[key];
};

var _assign = require('./utils/assign');

var _assign2 = _interopRequireDefault(_assign);

var _string = require('./utils/string');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var DATA_KEY = exports.DATA_KEY = Symbol && Symbol('data') || '__UNION__appDataKey';

},{"./utils/assign":2,"./utils/string":3}],2:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = assign;
function assign() {
	for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
		objs[_key] = arguments[_key];
	}

	return objs.reduce(function (res, obj) {
		if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !!obj) {
			Object.keys(obj).forEach(function (prop) {
				return res[prop] = obj[prop];
			});
		}
		return res;
	});
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.camelCase = camelCase;
exports.kebabCase = kebabCase;
var deburredLetters = {
	'\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	'\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	'\xc7': 'C', '\xe7': 'c',
	'\xd0': 'D', '\xf0': 'd',
	'\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	'\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	'\xcC': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	'\xeC': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
	'\xd1': 'N', '\xf1': 'n',
	'\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	'\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	'\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	'\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	'\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
	'\xc6': 'Ae', '\xe6': 'ae',
	'\xde': 'Th', '\xfe': 'th',
	'\xdf': 'ss'
};

function deburrLetter(letter) {
	return deburredLetters[letter];
}

function deburr(string) {
	string = String(string);
	return string && string.replace(/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g, deburrLetter).replace(/[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]/g, '');
}

function capitalize(string) {
	return string.replace(/^(.)/, function (l) {
		return l.toUpperCase();
	});
}

function words(string) {
	return deburr(string).replace(/\s*([A-Z])/g, ' $1').replace(/[\s-]+/g, ' ').split(' ');
}

function camelCase(string) {
	return words(string).reduce(function (result, word, index) {
		return result + (index ? capitalize(word.toLowerCase()) : word.toLowerCase());
	}, '');
}

function kebabCase(string) {
	return words(string).join('-').toLowerCase();
}

},{}],4:[function(require,module,exports){
'use strict';

var _index = require('../../src/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

describe('The data service', function () {

    beforeEach(function () {
        this.node = document.createElement('div');
    });

    it('can set and get a value from a single element', function () {

        (0, _index2.default)(this.node, 'foo', 'bar');
        expect((0, _index2.default)(this.node, 'foo')).toBe('bar');
    });

    it('can store multiple values to an element', function () {

        (0, _index2.default)(this.node, {
            one: 'foo',
            two: 'bar'
        });

        expect((0, _index2.default)(this.node, 'one')).toBe('foo');
        expect((0, _index2.default)(this.node, 'two')).toBe('bar');
    });

    it('can get all values from an element', function () {

        (0, _index2.default)(this.node, 'one', 'foo');
        (0, _index2.default)(this.node, 'two', 'bar');

        var results = (0, _index2.default)(this.node);

        expect(results.one).toBe('foo');
        expect(results.two).toBe('bar');
    });

    it('can get a value from a collection of elements');

    it('can store a value to each element in a NodeList');

    it('can store a value to each element in an array');
});

},{"../../src/index":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvdXRpbHMvYXNzaWduLmpzIiwic3JjL3V0aWxzL3N0cmluZy5qcyIsInRlc3Qvc3JjL0RhdGFTZXJ2aWNlU3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNLZSxBQUFVLE1BQVYsQUFBZ0IsS0FBaEIsQUFBcUI7O1FBRTVCLENBQUEsQUFBQyxNQUZrQyxBQUV2QyxBQUFXOzs7QUFGNEIsQUFFdkMsUUFHSSxPQUFPLEtBQUEsQUFBSyxZQUFZLEtBQUEsQUFBSyxhQUxNLEFBS1gsQUFBa0I7OztRQUcxQyxRQUFPLDRDQUFQLFVBQUEsQUFBZTtlQUNSLHNCQUFBLEFBQU8sTUFUcUIsQUFRdkMsQUFBNkIsQUFDekIsQUFBTyxBQUFhLEtBREssQUFDekI7Ozs7UUFJQSxPQUFBLEFBQU8sVUFBUCxBQUFpQjtlQUNWLEtBQUEsQUFBSyxPQWR1QixBQWF2QyxBQUFrQyxBQUN2QixBQUFZLE1BRFcsQUFDOUI7Ozs7UUFJQSxPQUFBLEFBQU8sUUFBUCxBQUFlOzs7Z0JBRVgsS0FBQSxBQUFLLGNBQUwsQUFBbUI7bUJBQXZCLEFBQTZCLEFBQU8sQUFDcEM7YUFENkI7aUJBQzdCLEFBQUssWUFBTCxBQUFpQixBQUdqQjs7O0FBSkEsZ0JBSUksS0FBQSxBQUFLOzs7dUJBRUUsT0FBTyxzQkFBQSxBQUFPLElBQUksS0FBQSxBQUFLLFNBRmxDLEFBQWtCLEFBRWQsQUFBTyxBQUFPLEFBQXlCLEFBSTNDO2tCQU5rQixBQUVkOzs7O2dCQUlBLFVBQUEsQUFBVSxBQUNkO21CQUFBLEFBQU8sS0FBSyxLQUFaLEFBQVksQUFBSyxZQUFqQixBQUE2Qjt1QkFBYyxLQUFBLEFBQUssV0FBTCxBQUFnQixLQUFoQixBQUFxQixRQUFyQixBQUE2QixhQUF4RSxBQUFvQyxBQUFPLEFBQTBDO2FBQWpELEVBQXBDLEFBQXdGLHVCQUFlLEFBQ25HO3dCQUFRLHVCQUFVLElBQUEsQUFBSSxRQUFKLEFBQVksU0FBOUIsQUFBUSxBQUFVLEFBQXFCLFFBQVEsS0FBQSxBQUFLLGFBRHhELEFBQWdHLEFBQU8sQUFDbkcsQUFBK0MsQUFBa0IsQUFHckU7YUFKZ0c7OzttQkFJekYsT0FBTyxzQkFBQSxBQUFPLElBQVAsQUFBVyxTQWpCRyxBQWlCNUIsQUFBTyxBQUFPLEFBQW9COztZQWpCTjs7a0dBbEJPLEFBa0J2Qzs7OztRQXFCSSxPQUFPLEtBQVAsQUFBTyxBQUFLLFNBQVosQUFBcUIsYUFBYSxBQUVsQzs7ZUFBTyxLQUFBLEFBQUssT0FBTyxLQUFBLEFBQUssVUFBVSxLQUFBLEFBQUssUUFBcEIsQUFBZSxBQUFhLE9BQU8sS0FBQSxBQUFLLHVCQUFxQix1QkFGcEYsQUFBc0MsQUFFZixBQUFtQyxBQUEwQixBQUFVLEFBRzlGOzs7V0FBTyxLQTVDSSxBQUE0QixBQTRDdkMsQUFBTyxBQUFLO0NBNUNEOzs7Ozs7Ozs7Ozs7QUFGUixJQUFNLDhCQUFXLFVBQVUsT0FBVixBQUFVLEFBQU8sV0FBakIsQUFBNEI7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDSDVCO0FBQVQsU0FBQSxBQUFTO21DQUFVO3lCQUFNLEFBQ3ZDOzs7UUFBTyxLQUFBLEFBQUssaUJBQU8sQUFBQyxLQUFELEFBQU07TUFDcEIsUUFBTyw0Q0FBUCxVQUFBLEFBQWUsWUFBWSxDQUFDLENBQUEsQUFBQztVQUNoQyxBQUFPLEtBQVAsQUFBWSxLQUFaLEFBQWlCO1dBQWdCLElBQUEsQUFBSSxRQUFRLElBRDlDLEFBQXNDLEFBQ3JDLEFBQXlCLEFBQVEsQUFBWSxBQUFJLEFBRWxEO0lBRjBCLEVBRFksQUFDckM7O1NBSFksQUFBeUIsQUFDdkMsQUFBbUIsQUFBYyxBQUloQyxBQUFPLElBSnlCLEFBQ2hDO0VBRGtCLEVBRG9COzs7Ozs7Ozs7UUMwQ3hCO1FBSUE7QUE5Q2hCLHNCQUFzQixBQUNyQjtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDMUU7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQzFFO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxBQUN0QjtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsQUFDdEI7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQ2hEO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUNoRDtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDaEQ7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQ2hEO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxBQUN0QjtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDMUU7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQzFFO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUNoRDtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDaEQ7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQ25DO1NBQUEsQUFBUSxNQUFNLFFBQUEsQUFBUSxBQUN0QjtTQUFBLEFBQVEsTUFBTSxRQUFBLEFBQVEsQUFDdEI7U0Fq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Z2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGFzc2lnbiBmcm9tICcuL3V0aWxzL2Fzc2lnbic7XG5pbXBvcnQgeyBjYW1lbENhc2UsIGtlYmFiQ2FzZSB9IGZyb20gJy4vdXRpbHMvc3RyaW5nJztcblxuZXhwb3J0IGNvbnN0IERBVEFfS0VZID0gU3ltYm9sICYmIFN5bWJvbCgnZGF0YScpIHx8ICdfX1VOSU9OX19hcHBEYXRhS2V5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGVsZW0sIGtleSwgdmFsdWUpIHtcbiAgICAvLyBkaWUgaWYgZWxlbSBudWxsXG4gICAgaWYgKCFlbGVtKSByZXR1cm47XG5cbiAgICAvLyBnZXQgZGF0YSBjYWNoZVxuICAgIGxldCBkYXRhID0gZWxlbVtEQVRBX0tFWV0gPSBlbGVtW0RBVEFfS0VZXSB8fCB7fTtcblxuICAgIC8vIGFzc2lnbiBtdWx0aXBsZSB2YWx1ZXMgdG8gY2FjaGUgaWYga2V5IGlzIGFuIG9iamVjdFxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gYXNzaWduKGRhdGEsIGtleSk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHZhbHVlIGlmIHZhbHVlIGlzIGRlZmluZWRcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZGF0YVtrZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGFsbCBkYXRhIHZhbHVlcyBpZiBrZXkgaXMgbm90IGRlZmluZWRcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gaWYgZGF0YXNldCBoYXMgYWxyZWFkeSBiZWVuIHByb2Nlc3NlZCwgcmV0dXJuIGRhdGEgY2FjaGVcbiAgICAgICAgaWYgKGRhdGFbREFUQV9LRVldID09PSB0cnVlKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YVtEQVRBX0tFWV0gPSB0cnVlO1xuXG4gICAgICAgIC8vIHVzZSBuYXRpdmUgZGF0YXNldCBpZiBzdXBwb3J0ZWRcbiAgICAgICAgaWYgKGVsZW0uZGF0YXNldCkge1xuICAgICAgICAgICAgLy8gYW55IGV4aXN0aW5nIGRhdGEgaW4gY2FjaGUgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGRhdGFzZXRcbiAgICAgICAgICAgIHJldHVybiBkYXRhID0gYXNzaWduKHt9LCBlbGVtLmRhdGFzZXQsIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCBlbGVtZW50IGF0dHJpYnV0ZXMgdGhhdCBzdGFydCB3aXRoICdkYXRhLScgYW5kIGFzc2lnbiB0aGVpciB2YWx1ZSB0byBkYXRhIGNhY2hlIHdpdGggYSBjYW1lbENhc2Uga2V5XG4gICAgICAgIGxldCBkYXRhc2V0ID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKGVsZW0uYXR0cmlidXRlcykuZmlsdGVyKGtleSA9PiBlbGVtLmF0dHJpYnV0ZXNba2V5XS5pbmRleE9mKCdkYXRhLScpID09PSAwKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBkYXRhc2V0W2NhbWVsQ2FzZShrZXkucmVwbGFjZSgnZGF0YS0nLCAnJykpXSA9IGVsZW0uZ2V0QXR0cmlidXRlKGtleSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhbnkgZXhpc3RpbmcgZGF0YSBpbiBjYWNoZSB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgZGF0YXNldFxuICAgICAgICByZXR1cm4gZGF0YSA9IGFzc2lnbih7fSwgZGF0YXNldCwgZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgYSB2YWx1ZSBoYXMgYWxyZWFkeSBiZWVuIHBsYWNlZCBpbiBjYWNoZSBmb3IgcHJvdmlkZWQga2V5XG4gICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIGNoZWNrIGRhdGFzZXQgKG9yIGF0dHJpYnV0ZSBpZiBkYXRhc2V0IG5vdCBzdXBwb3J0ZWQpIGFuZCBhdHRlbXB0IHRvIHNldCBjYWNoZSB2YWx1ZVxuICAgICAgICByZXR1cm4gZGF0YVtrZXldID0gZWxlbS5kYXRhc2V0ID8gZWxlbS5kYXRhc2V0W2tleV0gOiBlbGVtLmdldEF0dHJpYnV0ZShgZGF0YS0ke2tlYmFiQ2FzZShrZXkpfWApO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhW2tleV07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3NpZ24oLi4ub2Jqcykge1xuXHRyZXR1cm4gb2Jqcy5yZWR1Y2UoKHJlcywgb2JqKSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICEhb2JqKSB7XG5cdFx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2gocHJvcCA9PiByZXNbcHJvcF0gPSBvYmpbcHJvcF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzO1xuXHR9KTtcbn1cbiIsInZhciBkZWJ1cnJlZExldHRlcnMgPSB7XG5cdCdcXHhjMCc6ICdBJywgICdcXHhjMSc6ICdBJywgJ1xceGMyJzogJ0EnLCAnXFx4YzMnOiAnQScsICdcXHhjNCc6ICdBJywgJ1xceGM1JzogJ0EnLFxuXHQnXFx4ZTAnOiAnYScsICAnXFx4ZTEnOiAnYScsICdcXHhlMic6ICdhJywgJ1xceGUzJzogJ2EnLCAnXFx4ZTQnOiAnYScsICdcXHhlNSc6ICdhJyxcblx0J1xceGM3JzogJ0MnLCAgJ1xceGU3JzogJ2MnLFxuXHQnXFx4ZDAnOiAnRCcsICAnXFx4ZjAnOiAnZCcsXG5cdCdcXHhjOCc6ICdFJywgICdcXHhjOSc6ICdFJywgJ1xceGNhJzogJ0UnLCAnXFx4Y2InOiAnRScsXG5cdCdcXHhlOCc6ICdlJywgICdcXHhlOSc6ICdlJywgJ1xceGVhJzogJ2UnLCAnXFx4ZWInOiAnZScsXG5cdCdcXHhjQyc6ICdJJywgICdcXHhjZCc6ICdJJywgJ1xceGNlJzogJ0knLCAnXFx4Y2YnOiAnSScsXG5cdCdcXHhlQyc6ICdpJywgICdcXHhlZCc6ICdpJywgJ1xceGVlJzogJ2knLCAnXFx4ZWYnOiAnaScsXG5cdCdcXHhkMSc6ICdOJywgICdcXHhmMSc6ICduJyxcblx0J1xceGQyJzogJ08nLCAgJ1xceGQzJzogJ08nLCAnXFx4ZDQnOiAnTycsICdcXHhkNSc6ICdPJywgJ1xceGQ2JzogJ08nLCAnXFx4ZDgnOiAnTycsXG5cdCdcXHhmMic6ICdvJywgICdcXHhmMyc6ICdvJywgJ1xceGY0JzogJ28nLCAnXFx4ZjUnOiAnbycsICdcXHhmNic6ICdvJywgJ1xceGY4JzogJ28nLFxuXHQnXFx4ZDknOiAnVScsICAnXFx4ZGEnOiAnVScsICdcXHhkYic6ICdVJywgJ1xceGRjJzogJ1UnLFxuXHQnXFx4ZjknOiAndScsICAnXFx4ZmEnOiAndScsICdcXHhmYic6ICd1JywgJ1xceGZjJzogJ3UnLFxuXHQnXFx4ZGQnOiAnWScsICAnXFx4ZmQnOiAneScsICdcXHhmZic6ICd5Jyxcblx0J1xceGM2JzogJ0FlJywgJ1xceGU2JzogJ2FlJyxcblx0J1xceGRlJzogJ1RoJywgJ1xceGZlJzogJ3RoJyxcblx0J1xceGRmJzogJ3NzJ1xufTtcblxuZnVuY3Rpb24gZGVidXJyTGV0dGVyKGxldHRlcikge1xuXHRyZXR1cm4gZGVidXJyZWRMZXR0ZXJzW2xldHRlcl07XG59XG5cbmZ1bmN0aW9uIGRlYnVycihzdHJpbmcpIHtcbiAgICBzdHJpbmcgPSBTdHJpbmcoc3RyaW5nKTtcbiAgICByZXR1cm4gc3RyaW5nICYmIHN0cmluZ1xuICAgIFx0LnJlcGxhY2UoL1tcXHhjMC1cXHhkNlxceGQ4LVxceGRlXFx4ZGYtXFx4ZjZcXHhmOC1cXHhmZl0vZywgZGVidXJyTGV0dGVyKVxuICAgIFx0LnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZcXHVmZTIwLVxcdWZlMjNcXHUyMGQwLVxcdTIwZjBdL2csICcnKTtcbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eKC4pLywgbCA9PiBsLnRvVXBwZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiB3b3JkcyhzdHJpbmcpIHtcblx0cmV0dXJuIGRlYnVycihzdHJpbmcpXG5cdFx0LnJlcGxhY2UoL1xccyooW0EtWl0pL2csICcgJDEnKVxuXHRcdC5yZXBsYWNlKC9bXFxzLV0rL2csICcgJylcblx0XHQuc3BsaXQoJyAnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZShzdHJpbmcpIHtcblx0cmV0dXJuIHdvcmRzKHN0cmluZykucmVkdWNlKChyZXN1bHQsIHdvcmQsIGluZGV4KSA9PiByZXN1bHQgKyAoaW5kZXggPyBjYXBpdGFsaXplKHdvcmQudG9Mb3dlckNhc2UoKSkgOiB3b3JkLnRvTG93ZXJDYXNlKCkpLCAnJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrZWJhYkNhc2Uoc3RyaW5nKSB7XG5cdHJldHVybiB3b3JkcyhzdHJpbmcpLmpvaW4oJy0nKS50b0xvd2VyQ2FzZSgpO1xufSIsImltcG9ydCBkYXRhIGZyb20gJy4uLy4uL3NyYy9pbmRleCc7XG5cbmRlc2NyaWJlKCdUaGUgZGF0YSBzZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG5cbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW4gc2V0IGFuZCBnZXQgYSB2YWx1ZSBmcm9tIGEgc2luZ2xlIGVsZW1lbnQnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBkYXRhKHRoaXMubm9kZSwgJ2ZvbycsICdiYXInKTtcbiAgICAgICAgZXhwZWN0KGRhdGEodGhpcy5ub2RlLCAnZm9vJykpLnRvQmUoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbiBzdG9yZSBtdWx0aXBsZSB2YWx1ZXMgdG8gYW4gZWxlbWVudCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGRhdGEodGhpcy5ub2RlLCB7XG4gICAgICAgICAgICBvbmU6ICdmb28nLFxuICAgICAgICAgICAgdHdvOiAnYmFyJ1xuICAgICAgICB9KTtcblxuICAgICAgICBleHBlY3QoZGF0YSh0aGlzLm5vZGUsICdvbmUnKSkudG9CZSgnZm9vJyk7XG4gICAgICAgIGV4cGVjdChkYXRhKHRoaXMubm9kZSwgJ3R3bycpKS50b0JlKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW4gZ2V0IGFsbCB2YWx1ZXMgZnJvbSBhbiBlbGVtZW50JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgZGF0YSh0aGlzLm5vZGUsICdvbmUnLCAnZm9vJyk7XG4gICAgICAgIGRhdGEodGhpcy5ub2RlLCAndHdvJywgJ2JhcicpO1xuXG4gICAgICAgIHZhciByZXN1bHRzID0gZGF0YSh0aGlzLm5vZGUpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHRzLm9uZSkudG9CZSgnZm9vJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRzLnR3bykudG9CZSgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuIGdldCBhIHZhbHVlIGZyb20gYSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzJyk7XG5cbiAgICBpdCgnY2FuIHN0b3JlIGEgdmFsdWUgdG8gZWFjaCBlbGVtZW50IGluIGEgTm9kZUxpc3QnKTtcblxuICAgIGl0KCdjYW4gc3RvcmUgYSB2YWx1ZSB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXknKTtcbn0pO1xuIl19
