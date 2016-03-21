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
                    return typeof elem.attributes[key] === 'string' && elem.attributes[key].indexOf('data-') === 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXM1LWRhdGEuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvdXRpbHMvYXNzaWduLmpzIiwic3JjL3V0aWxzL3N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7Ozs7O0FBQ0EsT0FBQSxBQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDSVEsQUFBVSxNQUFWLEFBQWdCLEtBQWhCLEFBQXFCOztRQUU1QixDQUFBLEFBQUMsTUFGa0MsQUFFdkMsQUFBVzs7O0FBRjRCLEFBRXZDLFFBR0ksT0FBTyxLQUFBLEFBQUssWUFBWSxLQUFBLEFBQUssYUFMTSxBQUtYLEFBQWtCOzs7UUFHMUMsUUFBTyw0Q0FBUCxVQUFBLEFBQWU7ZUFDUixzQkFBQSxBQUFPLE1BVHFCLEFBUXZDLEFBQTZCLEFBQ3pCLEFBQU8sQUFBYSxLQURLLEFBQ3pCOzs7O1FBSUEsT0FBQSxBQUFPLFVBQVAsQUFBaUI7ZUFDVixLQUFBLEFBQUssT0FkdUIsQUFhdkMsQUFBa0MsQUFDdkIsQUFBWSxNQURXLEFBQzlCOzs7O1FBSUEsT0FBQSxBQUFPLFFBQVAsQUFBZTs7O2dCQUVYLEtBQUEsQUFBSyxjQUFMLEFBQW1CO21CQUF2QixBQUE2QixBQUFPLEFBQ3BDO2FBRDZCO2lCQUM3QixBQUFLLFlBQUwsQUFBaUIsQUFHakI7OztBQUpBLGdCQUlJLEtBQUEsQUFBSzs7O3VCQUVFLE9BQU8sc0JBQUEsQUFBTyxJQUFJLEtBQUEsQUFBSyxTQUZsQyxBQUFrQixBQUVkLEFBQU8sQUFBTyxBQUF5QixBQUczQztrQkFMa0IsQUFFZDs7O2dCQUdBLFVBQUEsQUFBVSxBQUdkOzs7Z0JBQUksS0FBQSxBQUFLOzt1QkFFTCxBQUFPLEtBQUssS0FBWixBQUFZLEFBQUssWUFBakIsQUFBNkI7MkJBQWMsT0FBTyxLQUFBLEFBQUssV0FBWixBQUFPLEFBQWdCLFNBQXZCLEFBQWdDLFlBQVksS0FBQSxBQUFLLFdBQUwsQUFBZ0IsS0FBaEIsQUFBcUIsUUFBckIsQUFBNkIsYUFBcEgsQUFBb0MsQUFBbUQsQUFBMEM7aUJBQTdGLEVBQXBDLEFBQW9JLHVCQUFlLEFBQy9JOzRCQUFRLHVCQUFVLElBQUEsQUFBSSxRQUFKLEFBQVksU0FBOUIsQUFBUSxBQUFVLEFBQXFCLFFBQVEsS0FBQSxBQUFLLGFBSDVELEFBQXFCLEFBRWpCLEFBQTRJLEFBQU8sQUFDL0ksQUFBK0MsQUFBa0IsQUFLekU7aUJBTmdKLEVBRjNILEFBRWpCOzs7OzttQkFNRyxPQUFPLHNCQUFBLEFBQU8sSUFBUCxBQUFXLFNBdEJHLEFBc0I1QixBQUFPLEFBQU8sQUFBb0I7O1lBdEJOOztrR0FsQk8sQUFrQnZDOzs7O1FBMEJJLE9BQU8sS0FBUCxBQUFPLEFBQUssU0FBWixBQUFxQixhQUFhLEFBRWxDOztlQUFPLEtBQUEsQUFBSyxPQUFPLEtBQUEsQUFBSyxVQUFVLEtBQUEsQUFBSyxRQUFwQixBQUFlLEFBQWEsT0FBTyxLQUFBLEFBQUssdUJBQXFCLHVCQUZwRixBQUFzQyxBQUVmLEFBQW1DLEFBQTBCLEFBQVUsQUFHOUY7OztXQUFPLEtBakRJLEFBQTRCLEFBaUR2QyxBQUFPLEFBQUs7Q0FqREQ7O0FBTGY7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBSSw4QkFBVyxPQUFBLEFBQU8sVUFBVSxPQUFqQixBQUFpQixBQUFPLFdBQXhCLEFBQW1DOzs7Ozs7Ozs7Ozs7Ozs7OztrQkNIakM7QUFBVCxTQUFBLEFBQVM7bUNBQVU7eUJBQU0sQUFDdkM7OztRQUFPLEtBQUEsQUFBSyxpQkFBTyxBQUFDLEtBQUQsQUFBTTtNQUNwQixRQUFPLDRDQUFQLFVBQUEsQUFBZSxZQUFZLENBQUMsQ0FBQSxBQUFDO1VBQ2hDLEFBQU8sS0FBUCxBQUFZLEtBQVosQUFBaUI7V0FBZ0IsSUFBQSxBQUFJLFFBQVEsSUFEOUMsQUFBc0MsQUFDckMsQUFBeUIsQUFBUSxBQUFZLEFBQUksQUFFbEQ7SUFGMEIsRUFEWSxBQUNyQzs7U0FIWSxBQUF5QixBQUN2QyxBQUFtQixBQUFjLEFBSWhDLEFBQU8sSUFKeUIsQUFDaEM7RUFEa0IsRUFEb0I7Ozs7Ozs7OztRQzBDeEI7UUFJQTtBQTlDaEIsc0JBQXNCLEFBQ3JCO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUMxRTtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDMUU7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEFBQ3RCO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxBQUN0QjtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDaEQ7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQ2hEO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUNoRDtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDaEQ7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEFBQ3RCO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUMxRTtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDMUU7U0FBQSxBQUFRLEtBQU0sUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEtBQUssUUFBQSxBQUFRLEFBQ2hEO1NBQUEsQUFBUSxLQUFNLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxLQUFLLFFBQUEsQUFBUSxBQUNoRDtTQUFBLEFBQVEsS0FBTSxRQUFBLEFBQVEsS0FBSyxRQUFBLEFBQVEsQUFDbkM7U0FBQSxBQUFRLE1BQU0sUUFBQSxBQUFRLEFBQ3RCO1NBQUEsQUFBUSxNQUFNLFFBQUEsQUFBUSxBQUN0QjtTQWpCRyxBQWlCSCxBQUFRO0NBakJMOztBQW9CSixTQUFBLEFBQVMsYUFBVCxBQUFzQixRQUFRLEFBQzdCO1FBQU8sZ0JBRFIsQUFBOEIsQUFDN0IsQUFBTyxBQUFnQjs7O0FBR3hCLFNBQUEsQUFBUyxPQUFULEFBQWdCLFFBQVEsQUFDcEI7VUFBUyxPQURXLEFBQ3BCLEFBQVMsQUFBTyxBQUNoQjtRQUFPLFVBQVUsT0FBQSxBQUNmLFFBRGUsQUFDUCwyQ0FETyxBQUNvQyxjQURwQyxBQUVmLFFBRmUsQUFFUCw4Q0FKZCxBQUF3QixBQUViLEFBQVUsQUFFdUM7OztBQUc1RCxTQUFBLEFBQVMsV0FBVCxBQUFvQjtRQUNaLE9BQUEsQUFBTyxRQUFQLEFBQWU7U0FBYSxFQURwQyxBQUE0QixBQUMzQixBQUE4QixBQUFLLEFBQUU7RUFBUCxFQURILEFBQzNCOzs7QUFHRCxTQUFBLEFBQVMsTUFBVCxBQUFlLFFBQVEsQUFDdEI7UUFBTyxPQUFBLEFBQU8sUUFBUCxBQUNMLFFBREssQUFDRyxlQURILEFBQ2tCLE9BRGxCLEFBRUwsUUFGSyxBQUVHLFdBRkgsQUFFYyxLQUZkLEFBR0wsTUFKSCxBQUF1QixBQUN0QixBQUFPLEFBR0M7OztBQUdGLFNBQUEsQUFBUyxVQUFULEFBQW1CO2NBQ2xCLEFBQU0sUUFBTixBQUFjLGlCQUFPLEFBQUMsUUFBRCxBQUFTLE1BQVQsQUFBZTtTQUFVLFVBQVUsUUFBUSxXQUFXLEtBQW5CLEFBQVEsQUFBVyxBQUFLLGlCQUFpQixLQUE1RSxBQUF5QixBQUFVLEFBQXlDLEFBQUs7RUFBakYsRUFEdEIsQUFBMkIsQUFDakMsQUFBTyxBQUFzSCxFQUF0SCxFQUQwQixBQUNqQzs7O0FBR00sU0FBQSxBQUFTLFVBQVQsQUFBbUIsUUFBUSxBQUNqQztRQUFPLE1BQUEsQUFBTSxRQUFOLEFBQWMsS0FBZCxBQUFtQixLQURwQixBQUEyQixBQUNqQyxBQUFPLEFBQXdCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBkYXRhIGZyb20gJy4vaW5kZXgnO1xud2luZG93LmRhdGEgPSBkYXRhO1xuIiwiaW1wb3J0IGFzc2lnbiBmcm9tICcuL3V0aWxzL2Fzc2lnbic7XG5pbXBvcnQgeyBjYW1lbENhc2UsIGtlYmFiQ2FzZSB9IGZyb20gJy4vdXRpbHMvc3RyaW5nJztcblxuZXhwb3J0IHZhciBEQVRBX0tFWSA9IHdpbmRvdy5TeW1ib2wgJiYgU3ltYm9sKCdkYXRhJykgfHwgJ19fTEVHT19fREFUQV9LRVknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZWxlbSwga2V5LCB2YWx1ZSkge1xuICAgIC8vIGRpZSBpZiBlbGVtIG51bGxcbiAgICBpZiAoIWVsZW0pIHJldHVybjtcblxuICAgIC8vIGdldCBkYXRhIGNhY2hlXG4gICAgbGV0IGRhdGEgPSBlbGVtW0RBVEFfS0VZXSA9IGVsZW1bREFUQV9LRVldIHx8IHt9O1xuXG4gICAgLy8gYXNzaWduIG11bHRpcGxlIHZhbHVlcyB0byBjYWNoZSBpZiBrZXkgaXMgYW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBhc3NpZ24oZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICAvLyBzZXQgdmFsdWUgaWYgdmFsdWUgaXMgZGVmaW5lZFxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBnZXQgYWxsIGRhdGEgdmFsdWVzIGlmIGtleSBpcyBub3QgZGVmaW5lZFxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBpZiBkYXRhc2V0IGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkLCByZXR1cm4gZGF0YSBjYWNoZVxuICAgICAgICBpZiAoZGF0YVtEQVRBX0tFWV0gPT09IHRydWUpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhW0RBVEFfS0VZXSA9IHRydWU7XG5cbiAgICAgICAgLy8gdXNlIG5hdGl2ZSBkYXRhc2V0IGlmIHN1cHBvcnRlZFxuICAgICAgICBpZiAoZWxlbS5kYXRhc2V0KSB7XG4gICAgICAgICAgICAvLyBhbnkgZXhpc3RpbmcgZGF0YSBpbiBjYWNoZSB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgZGF0YXNldFxuICAgICAgICAgICAgcmV0dXJuIGRhdGEgPSBhc3NpZ24oe30sIGVsZW0uZGF0YXNldCwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YXNldCA9IHt9O1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzbid0IGFuIGF0dHJpYnV0ZXMgcHJvcGVydHkgb24gdGhlIG9iamVjdCwgd2UgYXJlbid0IHdvcmtpbmcgd2l0aCBhIERPTSBub2RlLlxuICAgICAgICBpZiAoZWxlbS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAvLyBmaW5kIGVsZW1lbnQgYXR0cmlidXRlcyB0aGF0IHN0YXJ0IHdpdGggJ2RhdGEtJyBhbmQgYXNzaWduIHRoZWlyIHZhbHVlIHRvIGRhdGEgY2FjaGUgd2l0aCBhIGNhbWVsQ2FzZSBrZXlcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGVsZW0uYXR0cmlidXRlcykuZmlsdGVyKGtleSA9PiB0eXBlb2YgZWxlbS5hdHRyaWJ1dGVzW2tleV0gPT09ICdzdHJpbmcnICYmIGVsZW0uYXR0cmlidXRlc1trZXldLmluZGV4T2YoJ2RhdGEtJykgPT09IDApLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhc2V0W2NhbWVsQ2FzZShrZXkucmVwbGFjZSgnZGF0YS0nLCAnJykpXSA9IGVsZW0uZ2V0QXR0cmlidXRlKGtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gYW55IGV4aXN0aW5nIGRhdGEgaW4gY2FjaGUgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGRhdGFzZXRcbiAgICAgICAgcmV0dXJuIGRhdGEgPSBhc3NpZ24oe30sIGRhdGFzZXQsIGRhdGEpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGEgdmFsdWUgaGFzIGFscmVhZHkgYmVlbiBwbGFjZWQgaW4gY2FjaGUgZm9yIHByb3ZpZGVkIGtleVxuICAgIGlmICh0eXBlb2YgZGF0YVtrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBjaGVjayBkYXRhc2V0IChvciBhdHRyaWJ1dGUgaWYgZGF0YXNldCBub3Qgc3VwcG9ydGVkKSBhbmQgYXR0ZW1wdCB0byBzZXQgY2FjaGUgdmFsdWVcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XSA9IGVsZW0uZGF0YXNldCA/IGVsZW0uZGF0YXNldFtrZXldIDogZWxlbS5nZXRBdHRyaWJ1dGUoYGRhdGEtJHtrZWJhYkNhc2Uoa2V5KX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YVtrZXldO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXNzaWduKC4uLm9ianMpIHtcblx0cmV0dXJuIG9ianMucmVkdWNlKChyZXMsIG9iaikgPT4ge1xuXHRcdGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhIW9iaikge1xuXHRcdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKHByb3AgPT4gcmVzW3Byb3BdID0gb2JqW3Byb3BdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcztcblx0fSk7XG59XG4iLCJ2YXIgZGVidXJyZWRMZXR0ZXJzID0ge1xuXHQnXFx4YzAnOiAnQScsICAnXFx4YzEnOiAnQScsICdcXHhjMic6ICdBJywgJ1xceGMzJzogJ0EnLCAnXFx4YzQnOiAnQScsICdcXHhjNSc6ICdBJyxcblx0J1xceGUwJzogJ2EnLCAgJ1xceGUxJzogJ2EnLCAnXFx4ZTInOiAnYScsICdcXHhlMyc6ICdhJywgJ1xceGU0JzogJ2EnLCAnXFx4ZTUnOiAnYScsXG5cdCdcXHhjNyc6ICdDJywgICdcXHhlNyc6ICdjJyxcblx0J1xceGQwJzogJ0QnLCAgJ1xceGYwJzogJ2QnLFxuXHQnXFx4YzgnOiAnRScsICAnXFx4YzknOiAnRScsICdcXHhjYSc6ICdFJywgJ1xceGNiJzogJ0UnLFxuXHQnXFx4ZTgnOiAnZScsICAnXFx4ZTknOiAnZScsICdcXHhlYSc6ICdlJywgJ1xceGViJzogJ2UnLFxuXHQnXFx4Y0MnOiAnSScsICAnXFx4Y2QnOiAnSScsICdcXHhjZSc6ICdJJywgJ1xceGNmJzogJ0knLFxuXHQnXFx4ZUMnOiAnaScsICAnXFx4ZWQnOiAnaScsICdcXHhlZSc6ICdpJywgJ1xceGVmJzogJ2knLFxuXHQnXFx4ZDEnOiAnTicsICAnXFx4ZjEnOiAnbicsXG5cdCdcXHhkMic6ICdPJywgICdcXHhkMyc6ICdPJywgJ1xceGQ0JzogJ08nLCAnXFx4ZDUnOiAnTycsICdcXHhkNic6ICdPJywgJ1xceGQ4JzogJ08nLFxuXHQnXFx4ZjInOiAnbycsICAnXFx4ZjMnOiAnbycsICdcXHhmNCc6ICdvJywgJ1xceGY1JzogJ28nLCAnXFx4ZjYnOiAnbycsICdcXHhmOCc6ICdvJyxcblx0J1xceGQ5JzogJ1UnLCAgJ1xceGRhJzogJ1UnLCAnXFx4ZGInOiAnVScsICdcXHhkYyc6ICdVJyxcblx0J1xceGY5JzogJ3UnLCAgJ1xceGZhJzogJ3UnLCAnXFx4ZmInOiAndScsICdcXHhmYyc6ICd1Jyxcblx0J1xceGRkJzogJ1knLCAgJ1xceGZkJzogJ3knLCAnXFx4ZmYnOiAneScsXG5cdCdcXHhjNic6ICdBZScsICdcXHhlNic6ICdhZScsXG5cdCdcXHhkZSc6ICdUaCcsICdcXHhmZSc6ICd0aCcsXG5cdCdcXHhkZic6ICdzcydcbn07XG5cbmZ1bmN0aW9uIGRlYnVyckxldHRlcihsZXR0ZXIpIHtcblx0cmV0dXJuIGRlYnVycmVkTGV0dGVyc1tsZXR0ZXJdO1xufVxuXG5mdW5jdGlvbiBkZWJ1cnIoc3RyaW5nKSB7XG4gICAgc3RyaW5nID0gU3RyaW5nKHN0cmluZyk7XG4gICAgcmV0dXJuIHN0cmluZyAmJiBzdHJpbmdcbiAgICBcdC5yZXBsYWNlKC9bXFx4YzAtXFx4ZDZcXHhkOC1cXHhkZVxceGRmLVxceGY2XFx4ZjgtXFx4ZmZdL2csIGRlYnVyckxldHRlcilcbiAgICBcdC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXFx1ZmUyMC1cXHVmZTIzXFx1MjBkMC1cXHUyMGYwXS9nLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZSgvXiguKS8sIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gd29yZHMoc3RyaW5nKSB7XG5cdHJldHVybiBkZWJ1cnIoc3RyaW5nKVxuXHRcdC5yZXBsYWNlKC9cXHMqKFtBLVpdKS9nLCAnICQxJylcblx0XHQucmVwbGFjZSgvW1xccy1dKy9nLCAnICcpXG5cdFx0LnNwbGl0KCcgJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2Uoc3RyaW5nKSB7XG5cdHJldHVybiB3b3JkcyhzdHJpbmcpLnJlZHVjZSgocmVzdWx0LCB3b3JkLCBpbmRleCkgPT4gcmVzdWx0ICsgKGluZGV4ID8gY2FwaXRhbGl6ZSh3b3JkLnRvTG93ZXJDYXNlKCkpIDogd29yZC50b0xvd2VyQ2FzZSgpKSwgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga2ViYWJDYXNlKHN0cmluZykge1xuXHRyZXR1cm4gd29yZHMoc3RyaW5nKS5qb2luKCctJykudG9Mb3dlckNhc2UoKTtcbn0iXX0=
