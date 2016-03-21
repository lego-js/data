import assign from './utils/assign';
import { camelCase, kebabCase } from './utils/string';

export var DATA_KEY = window.Symbol && Symbol('data') || '__LEGO__DATA_KEY';

export default function (elem, key, value) {
    // die if elem null
    if (!elem) return;

    // get data cache
    let data = elem[DATA_KEY] = elem[DATA_KEY] || {};

    // assign multiple values to cache if key is an object
    if (typeof key === 'object') {
        return assign(data, key);
    }

    // set value if value is defined
    if (typeof value !== 'undefined') {
        return data[key] = value;
    }

    // get all data values if key is not defined
    if (typeof key === 'undefined') {
        // if dataset has already been processed, return data cache
        if (data[DATA_KEY] === true) return data;
        data[DATA_KEY] = true;

        // use native dataset if supported
        if (elem.dataset) {
            // any existing data in cache takes precedence over dataset
            return data = assign({}, elem.dataset, data);
        }

        let dataset = {};

        // if there isn't an attributes property on the object, we aren't working with a DOM node.
        if (elem.attributes) {
            // find element attributes that start with 'data-' and assign their value to data cache with a camelCase key
            Object.keys(elem.attributes).filter(key => typeof elem.attributes[key] === 'string' && elem.attributes[key].indexOf('data-') === 0).forEach(key => {
                dataset[camelCase(key.replace('data-', ''))] = elem.getAttribute(key);
            });
        }
        
        // any existing data in cache takes precedence over dataset
        return data = assign({}, dataset, data);
    }

    // check if a value has already been placed in cache for provided key
    if (typeof data[key] === 'undefined') {
        // check dataset (or attribute if dataset not supported) and attempt to set cache value
        return data[key] = elem.dataset ? elem.dataset[key] : elem.getAttribute(`data-${kebabCase(key)}`);
    }

    return data[key];
}
