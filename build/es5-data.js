(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

window.data = _index2.default;

},{"./index":2}],2:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DATA_KEY = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

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

            var dataset = {};

            // if there isn't an attributes property on the object, we aren't working with a DOM node.
            if (elem.attributes) {
                // find element attributes that start with 'data-' and assign their value to data cache with a camelCase key
                Object.keys(elem.attributes).filter(function (key) {
                    return elem.attributes[key].indexOf('data-') === 0;
                }).forEach(function (key) {
                    dataset[(0, _string.camelCase)(key.replace('data-', ''))] = elem.getAttribute(key);
                });
            }

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

var DATA_KEY = exports.DATA_KEY = window.Symbol && Symbol('data') || '__LEGO__DATA_KEY';

},{"./utils/assign":3,"./utils/string":4}],3:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

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

},{}],4:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXM1LWRhdGEuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvdXRpbHMvYXNzaWduLmpzIiwic3JjL3V0aWxzL3N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7Ozs7O0FBQ0EsT0FBQSxBQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDSVEsQUFBVSxNQUFWLEFBQWdCLEtBQWhCLEFBQXFCOztRQUU1QixDQUFBLEFBQUMsTUFGa0MsQUFFdkMsQUFBVzs7O0FBRjRCLEFBRXZDLFFBR0ksT0FBTyxLQUFBLEFBQUssWUFBWSxLQUFBLEFBQUssYUFMTSxBQUtYLEFBQWtCOzs7UUFHMUMsUUFBTyw0Q0FBUCxVQUFBLEFBQWU7ZUFDUixzQkFBQSxBQUFPLE1BVHFCLEFBUXZDLEFBQTZCLEFBQ3pCLEFBQU8sQUFBYSxLQURLLEFBQ3pCOzs7O1FBSUEsT0FBQSxBQUFPLFVBQVAsQUFBaUI7ZUFDVixLQUFBLEFBQUssT0FkdUIsQUFhdkMsQUFBa0MsQUFDdkIsQUFBWSxNQURXLEFBQzlCOzs7O1FBSUEsT0FBQSxBQUFPLFFBQVAsQUFBZTs7O2dCQUVYLEtBQUEsQUFBSyxjQUFMLEFBQW1CO21CQUF2QixBQUE2QixBQUFPLEFBQ3BDO2FBRDZCO2lCQUM3QixBQUFLLFlBQUwsQUFBaUIsQUFHakI7OztBQUpBLGdCQUlJLEtBQUEsQUFBSzs7O3VCQUVFLE9BQU8sc0JBQUEsQUFBTyxJQUFJLEtBQUEsQUFBSyxTQUZsQyxBQUFrQixBQUVkLEFBQU8sQUFBTyxBQUF5QixBQUczQztrQkFMa0IsQUFFZDs7O2dCQUdBLFVBQUEsQUFBVSxBQUdkOzs7Z0JBQUksS0FBQSxBQUFLOzt1QkFFTCxBQUFPLEtBQUssS0FBWixBQUFZLEFBQUssWUFBakIsQUFBNkI7MkJBQWMsS0FBQSxBQUFLLFdBQUwsQUFBZ0IsS0FBaEIsQUFBcUIsUUFBckIsQUFBNkIsYUFBeEUsQUFBb0MsQUFBTyxBQUEwQztpQkFBakQsRUFBcEMsQUFBd0YsdUJBQWUsQUFDbkc7NEJBQVEsdUJBQVUsSUFBQSxBQUFJLFFBQUosQUFBWSxTQUE5QixBQUFRLEFBQVUsQUFBcUIsUUFBUSxLQUFBLEFBQUssYUFINUQsQUFBcUIsQUFFakIsQUFBZ0csQUFBTyxBQUNuRyxBQUErQyxBQUFrQixBQUt6RTtpQkFOb0csRUFGL0UsQUFFakI7Ozs7O21CQU1HLE9BQU8sc0JBQUEsQUFBTyxJQUFQLEFBQVcsU0F0QkcsQUFzQjVCLEFBQU8sQUFBTyxBQUFvQjs7WUF0Qk47O2tHQWxCTyxBQWtCdkM7Ozs7UUEwQkksT0FBTyxLQUFQLEFBQU8sQUFBSyxTQUFaLEFBQXFCLGFBQWEsQUFFbEM7O2VBQU8sS0FBQSxBQUFLLE9BQU8sS0FBQSxBQUFLLFVBQVUsS0FBQSxBQUFLLFFBQXBCLEFBQWUsQUFBYSxPQUFPLEtBQUEsQUFBSyx1QkFBcUIsdUJBRnBGLEFBQXNDLEFBRWYsQUFBbUMsQUFBMEIsQUFBVSxBQUc5Rjs7O1dBQU8sS0FqREksQUFBNEIsQUFpRHZDLEFBQU8sQUFBSztDQWpERDs7QUFMZjs7OztBQUNBOzs7Ozs7QUFFTyxJQUFJLDhCQUFXLE9BQUEsQUFBTyxVQUFVLE9BQWpCLEFBQWlCLEFBQU8sV0FBeEIsQUFBbUM7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ0hqQztBQUFULFNBQUEsQUFBUzttQ0FBVTt5QkFBTSxBQUN2Qzs7O1FBQU8sS0FBQSxBQUFLLGlCQUFPLEFBQUMsS0FBRCxBQUFNO01BQ3BCLFFBQU8sNENBQVAsVUFBQSxBQUFlLFlBQVksQ0FBQyxDQUFBLEFBQUM7VUFDaEMsQUFBTyxLQUFQLEFBQVksS0FBWixBQUFpQjtXQUFnQixJQUFBLEFBQUksUUFBUSxJQUQ5QyxBQUFzQyxBQUNyQyxBQUF5QixBQUFRLEFBQVksQUFBSSxBQUVsRDtJQUYwQixFQURZLEFBQ3JDOztTQUhZLEFBQXlCLEFBQ3ZDLEFBQW1CLEFBQWMsQUFJaEMsQUFBTyxJQUp5QixBQUNoQztFQURrQixFQURvQjs7Ozs7Ozs7O1FDMEN4QjtRQUlBO0FBOUNoQixzQkFBc0IsQUFDckI7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQzFFO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUMxRTtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsQUFDdEI7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEFBQ3RCO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUNoRDtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDaEQ7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQ2hEO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUNoRDtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsQUFDdEI7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQzFFO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUMxRTtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDaEQ7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQ2hEO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUNuQztTQUFBLEFBQVEsTUFBTSxRQUFBLEFBQVEsQUFDdEI7U0FBQSxBQUFRLE1BQU0sUUFBQSxBQUFRLEFBQ3RCO1NBakJHLEFBaUJILEFBQVE7Q0FqQkw7O0FBb0JKLFNBQUEsQUFBUyxhQUFULEFBQXNCLFFBQVEsQUFDN0I7UUFBTyxnQkFEUixBQUE4QixBQUM3QixBQUFPLEFBQWdCOzs7QUFHeEIsU0FBQSxBQUFTLE9BQVQsQUFBZ0IsUUFBUSxBQUNwQjtVQUFTLE9BRFcsQUFDcEIsQUFBUyxBQUFPLEFBQ2hCO1FBQU8sVUFBVSxPQUFBLEFBQ2YsUUFEZSxBQUNQLDJDQURPLEFBQ29DLGNBRHBDLEFBRWYsUUFGZSxBQUVQLDhDQUpkLEFBQXdCLEFBRWIsQUFBVSxBQUV1Qzs7O0FBRzVELFNBQUEsQUFBUyxXQUFULEFBQW9CO1FBQ1osT0FBQSxBQUFPLFFBQVAsQUFBZTtTQUFhLEVBRHBDLEFBQTRCLEFBQzNCLEFBQThCLEFBQUssQUFBRTtFQUFQLEVBREgsQUFDM0I7OztBQUdELFNBQUEsQUFBUyxNQUFULEFBQWUsUUFBUSxBQUN0QjtRQUFPLE9BQUEsQUFBTyxRQUFQLEFBQ0wsUUFESyxBQUNHLGVBREgsQUFDa0IsT0FEbEIsQUFFTCxRQUZLLEFBRUcsV0FGSCxBQUVjLEtBRmQsQUFHTCxNQUpILEFBQXVCLEFBQ3RCLEFBQU8sQUFHQzs7O0FBR0YsU0FBQSxBQUFTLFVBQVQsQUFBbUI7Y0FDbEIsQUFBTSxRQUFOLEFBQWMsaUJBQU8sQUFBQyxRQUFELEFBQVMsTUFBVCxBQUFlO1NBQVUsVUFBVSxRQUFRLFdBQVcsS0FBbkIsQUFBUSxBQUFXLEFBQUssaUJBQWlCLEtBQTVFLEFBQXlCLEFBQVUsQUFBeUMsQUFBSztFQUFqRixFQUR0QixBQUEyQixBQUNqQyxBQUFPLEFBQXNILEVBQXRILEVBRDBCLEFBQ2pDOzs7QUFHTSxTQUFBLEFBQVMsVUFBVCxBQUFtQixRQUFRLEFBQ2pDO1FBQU8sTUFBQSxBQUFNLFFBQU4sQUFBYyxLQUFkLEFBQW1CLEtBRHBCLEFBQTJCLEFBQ2pDLEFBQU8sQUFBd0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9pbmRleCc7XG53aW5kb3cuZGF0YSA9IGRhdGE7XG4iLCJpbXBvcnQgYXNzaWduIGZyb20gJy4vdXRpbHMvYXNzaWduJztcbmltcG9ydCB7IGNhbWVsQ2FzZSwga2ViYWJDYXNlIH0gZnJvbSAnLi91dGlscy9zdHJpbmcnO1xuXG5leHBvcnQgdmFyIERBVEFfS0VZID0gd2luZG93LlN5bWJvbCAmJiBTeW1ib2woJ2RhdGEnKSB8fCAnX19MRUdPX19EQVRBX0tFWSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChlbGVtLCBrZXksIHZhbHVlKSB7XG4gICAgLy8gZGllIGlmIGVsZW0gbnVsbFxuICAgIGlmICghZWxlbSkgcmV0dXJuO1xuXG4gICAgLy8gZ2V0IGRhdGEgY2FjaGVcbiAgICBsZXQgZGF0YSA9IGVsZW1bREFUQV9LRVldID0gZWxlbVtEQVRBX0tFWV0gfHwge307XG5cbiAgICAvLyBhc3NpZ24gbXVsdGlwbGUgdmFsdWVzIHRvIGNhY2hlIGlmIGtleSBpcyBhbiBvYmplY3RcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGFzc2lnbihkYXRhLCBrZXkpO1xuICAgIH1cblxuICAgIC8vIHNldCB2YWx1ZSBpZiB2YWx1ZSBpcyBkZWZpbmVkXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGdldCBhbGwgZGF0YSB2YWx1ZXMgaWYga2V5IGlzIG5vdCBkZWZpbmVkXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIGlmIGRhdGFzZXQgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQsIHJldHVybiBkYXRhIGNhY2hlXG4gICAgICAgIGlmIChkYXRhW0RBVEFfS0VZXSA9PT0gdHJ1ZSkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGFbREFUQV9LRVldID0gdHJ1ZTtcblxuICAgICAgICAvLyB1c2UgbmF0aXZlIGRhdGFzZXQgaWYgc3VwcG9ydGVkXG4gICAgICAgIGlmIChlbGVtLmRhdGFzZXQpIHtcbiAgICAgICAgICAgIC8vIGFueSBleGlzdGluZyBkYXRhIGluIGNhY2hlIHRha2VzIHByZWNlZGVuY2Ugb3ZlciBkYXRhc2V0XG4gICAgICAgICAgICByZXR1cm4gZGF0YSA9IGFzc2lnbih7fSwgZWxlbS5kYXRhc2V0LCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhc2V0ID0ge307XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXNuJ3QgYW4gYXR0cmlidXRlcyBwcm9wZXJ0eSBvbiB0aGUgb2JqZWN0LCB3ZSBhcmVuJ3Qgd29ya2luZyB3aXRoIGEgRE9NIG5vZGUuXG4gICAgICAgIGlmIChlbGVtLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIC8vIGZpbmQgZWxlbWVudCBhdHRyaWJ1dGVzIHRoYXQgc3RhcnQgd2l0aCAnZGF0YS0nIGFuZCBhc3NpZ24gdGhlaXIgdmFsdWUgdG8gZGF0YSBjYWNoZSB3aXRoIGEgY2FtZWxDYXNlIGtleVxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZWxlbS5hdHRyaWJ1dGVzKS5maWx0ZXIoa2V5ID0+IGVsZW0uYXR0cmlidXRlc1trZXldLmluZGV4T2YoJ2RhdGEtJykgPT09IDApLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhc2V0W2NhbWVsQ2FzZShrZXkucmVwbGFjZSgnZGF0YS0nLCAnJykpXSA9IGVsZW0uZ2V0QXR0cmlidXRlKGtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gYW55IGV4aXN0aW5nIGRhdGEgaW4gY2FjaGUgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGRhdGFzZXRcbiAgICAgICAgcmV0dXJuIGRhdGEgPSBhc3NpZ24oe30sIGRhdGFzZXQsIGRhdGEpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGEgdmFsdWUgaGFzIGFscmVhZHkgYmVlbiBwbGFjZWQgaW4gY2FjaGUgZm9yIHByb3ZpZGVkIGtleVxuICAgIGlmICh0eXBlb2YgZGF0YVtrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBjaGVjayBkYXRhc2V0IChvciBhdHRyaWJ1dGUgaWYgZGF0YXNldCBub3Qgc3VwcG9ydGVkKSBhbmQgYXR0ZW1wdCB0byBzZXQgY2FjaGUgdmFsdWVcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XSA9IGVsZW0uZGF0YXNldCA/IGVsZW0uZGF0YXNldFtrZXldIDogZWxlbS5nZXRBdHRyaWJ1dGUoYGRhdGEtJHtrZWJhYkNhc2Uoa2V5KX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YVtrZXldO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXNzaWduKC4uLm9ianMpIHtcblx0cmV0dXJuIG9ianMucmVkdWNlKChyZXMsIG9iaikgPT4ge1xuXHRcdGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhIW9iaikge1xuXHRcdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKHByb3AgPT4gcmVzW3Byb3BdID0gb2JqW3Byb3BdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcztcblx0fSk7XG59XG4iLCJ2YXIgZGVidXJyZWRMZXR0ZXJzID0ge1xuXHQnXFx4YzAnOiAnQScsICAnXFx4YzEnOiAnQScsICdcXHhjMic6ICdBJywgJ1xceGMzJzogJ0EnLCAnXFx4YzQnOiAnQScsICdcXHhjNSc6ICdBJyxcblx0J1xceGUwJzogJ2EnLCAgJ1xceGUxJzogJ2EnLCAnXFx4ZTInOiAnYScsICdcXHhlMyc6ICdhJywgJ1xceGU0JzogJ2EnLCAnXFx4ZTUnOiAnYScsXG5cdCdcXHhjNyc6ICdDJywgICdcXHhlNyc6ICdjJyxcblx0J1xceGQwJzogJ0QnLCAgJ1xceGYwJzogJ2QnLFxuXHQnXFx4YzgnOiAnRScsICAnXFx4YzknOiAnRScsICdcXHhjYSc6ICdFJywgJ1xceGNiJzogJ0UnLFxuXHQnXFx4ZTgnOiAnZScsICAnXFx4ZTknOiAnZScsICdcXHhlYSc6ICdlJywgJ1xceGViJzogJ2UnLFxuXHQnXFx4Y0MnOiAnSScsICAnXFx4Y2QnOiAnSScsICdcXHhjZSc6ICdJJywgJ1xceGNmJzogJ0knLFxuXHQnXFx4ZUMnOiAnaScsICAnXFx4ZWQnOiAnaScsICdcXHhlZSc6ICdpJywgJ1xceGVmJzogJ2knLFxuXHQnXFx4ZDEnOiAnTicsICAnXFx4ZjEnOiAnbicsXG5cdCdcXHhkMic6ICdPJywgICdcXHhkMyc6ICdPJywgJ1xceGQ0JzogJ08nLCAnXFx4ZDUnOiAnTycsICdcXHhkNic6ICdPJywgJ1xceGQ4JzogJ08nLFxuXHQnXFx4ZjInOiAnbycsICAnXFx4ZjMnOiAnbycsICdcXHhmNCc6ICdvJywgJ1xceGY1JzogJ28nLCAnXFx4ZjYnOiAnbycsICdcXHhmOCc6ICdvJyxcblx0J1xceGQ5JzogJ1UnLCAgJ1xceGRhJzogJ1UnLCAnXFx4ZGInOiAnVScsICdcXHhkYyc6ICdVJyxcblx0J1xceGY5JzogJ3UnLCAgJ1xceGZhJzogJ3UnLCAnXFx4ZmInOiAndScsICdcXHhmYyc6ICd1Jyxcblx0J1xceGRkJzogJ1knLCAgJ1xceGZkJzogJ3knLCAnXFx4ZmYnOiAneScsXG5cdCdcXHhjNic6ICdBZScsICdcXHhlNic6ICdhZScsXG5cdCdcXHhkZSc6ICdUaCcsICdcXHhmZSc6ICd0aCcsXG5cdCdcXHhkZic6ICdzcydcbn07XG5cbmZ1bmN0aW9uIGRlYnVyckxldHRlcihsZXR0ZXIpIHtcblx0cmV0dXJuIGRlYnVycmVkTGV0dGVyc1tsZXR0ZXJdO1xufVxuXG5mdW5jdGlvbiBkZWJ1cnIoc3RyaW5nKSB7XG4gICAgc3RyaW5nID0gU3RyaW5nKHN0cmluZyk7XG4gICAgcmV0dXJuIHN0cmluZyAmJiBzdHJpbmdcbiAgICBcdC5yZXBsYWNlKC9bXFx4YzAtXFx4ZDZcXHhkOC1cXHhkZVxceGRmLVxceGY2XFx4ZjgtXFx4ZmZdL2csIGRlYnVyckxldHRlcilcbiAgICBcdC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXFx1ZmUyMC1cXHVmZTIzXFx1MjBkMC1cXHUyMGYwXS9nLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZSgvXiguKS8sIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gd29yZHMoc3RyaW5nKSB7XG5cdHJldHVybiBkZWJ1cnIoc3RyaW5nKVxuXHRcdC5yZXBsYWNlKC9cXHMqKFtBLVpdKS9nLCAnICQxJylcblx0XHQucmVwbGFjZSgvW1xccy1dKy9nLCAnICcpXG5cdFx0LnNwbGl0KCcgJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2Uoc3RyaW5nKSB7XG5cdHJldHVybiB3b3JkcyhzdHJpbmcpLnJlZHVjZSgocmVzdWx0LCB3b3JkLCBpbmRleCkgPT4gcmVzdWx0ICsgKGluZGV4ID8gY2FwaXRhbGl6ZSh3b3JkLnRvTG93ZXJDYXNlKCkpIDogd29yZC50b0xvd2VyQ2FzZSgpKSwgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga2ViYWJDYXNlKHN0cmluZykge1xuXHRyZXR1cm4gd29yZHMoc3RyaW5nKS5qb2luKCctJykudG9Mb3dlckNhc2UoKTtcbn0iXX0=
