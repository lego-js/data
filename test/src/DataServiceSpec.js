import data from '../../src/index';

describe('The data service', function() {

    beforeEach(function() {
        this.node = document.createElement('div');
    });

    it('can set and get a value from a single element', function() {

        data(this.node, 'foo', 'bar');
        expect(data(this.node, 'foo')).toBe('bar');
    });

    it('can store multiple values to an element', function() {

        data(this.node, {
            one: 'foo',
            two: 'bar'
        });

        expect(data(this.node, 'one')).toBe('foo');
        expect(data(this.node, 'two')).toBe('bar');
    });

    it('can get all values from an element', function() {

        data(this.node, 'one', 'foo');
        data(this.node, 'two', 'bar');

        var results = data(this.node);

        expect(results.one).toBe('foo');
        expect(results.two).toBe('bar');
    });

    it('can get a value from a collection of elements');

    it('can store a value to each element in a NodeList');

    it('can store a value to each element in an array');
});
