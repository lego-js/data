export const DATA_KEY = Symbol && Symbol('data') || '__UNION__appDataKey';

export default function (elem, key, value) {
    // die if elem null
    if (!elem) return;

    // get data cache
    let data = elem[DATA_KEY] = elem[DATA_KEY] || {};

    // assign multiple values to cache if key is an object
    if (typeof key === 'object') {
        return _.assign(data, key);
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
            return data = _.assign({}, elem.dataset, data);
        }

        // find element attributes that start with 'data-' and assign their value to data cache with a camelCase key
        let dataset = {};
        _(elem.attributes).filter((val, attr) => _.startsWith(attr, 'data-')).forEach((val, attr) => {
            dataset[_.camelCase(attr.replace('data-', ''))] = val;
        });
        // any existing data in cache takes precedence over dataset
        return data = _.assign({}, dataset, data);
    }

    // check if a value has already been placed in cache for provided key
    if (typeof data[key] === 'undefined') {
        // check dataset (or attribute if dataset not supported) and attempt to set cache value
        return data[key] = elem.dataset ? elem.dataset[key] : elem.getAttribute(`data-${_.kebabCase(key)}`);
    }

    return data[key];
}
