---
layout: default
title: "Lego Data Documentation"
---

# data()

Store arbitrary data associated with the specified element and/or return the value that was set.

## data( element, key, value )

**Description:** Store arbitrary data associated with the specified element. Returns the value that was set.

- version 1
  - **element**<br>
    Type: Element<br>
    The DOM element to associate with the data.
  - **key**<br>
    Type: String<br>
    A string naming the piece of data to set.
  - **value**<br>
    Type: Anything<br>
    The new data value; this can be any Javascript type except `undefined`.
- version 2
  - **element**<br>
    Type: Element<br>
    The DOM element to associate with the data.
  - **obj**<br>
    Type: Object<br>
    An object of key-value pairs of data to update.    
    

The `data()` method allows us to attach data of any type to DOM elements in a way that is safe from circular references and therefore free from memory leaks. The data is stored directly on the DOM elements using a Symbol. The advantages of this method is that the values are gaurenteed to not clash with and 3rd party data added to the elements along with any future specifications that may come. The second advantage is that garbage collection is handled by the browser, not the lib, so if a DOM element is removed, so too is it's associated data. We can set several distinct values for a single element and retrieve them later:

    data( document.body, 'foo', 52 );
    data( document.body, 'bar', { myType: 'test', count: 40 } );
    data( doucment.body, { baz: [ 1, 2, 3 ] } );
    data( document.body, 'foo' ); // 52
    data( document.body ); // { foo: 52, bar: { myType: "test", count: 40 }, baz: [ 1, 2, 3 ] }

### Additional Notes:

- This utility actually supports any generic object or function that you wish to pass in as the first argument. However it's main purpose is to store data associated with DOM elements, so all the examples below will reflect this.
- Setting an element's data object with `data( el, obj )` extends (as opposed to replacing) the data previously stored with that element.
- Note that this method currently does not provide cross-platform support for setting data on XML documents, as Internet Explorer does not allow data to be attached via expando properties.
- `undefined` is not recognized as a data value. Calls such as `data( el, 'name', undefined )` will return the corresponding data for "name", and is therefore the same as `data( el, 'name' )`.

### Example:

Store then retrieve a value from the div element.

    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>data demo</title>
      <style>
        div {
          color: blue;
        }
        span {
          color: red;
        }
      </style>
      <script src="build/es5-data.js"></script>
    </head>
    <body>
 
    <div>
      The values stored were
      <span></span>
      and
      <span></span>
    </div>
 
    <script>
      var div = document.querySelector( "div" );
      data( div, 'test', {
        first: 16,
        last: 'pizza!'
      });
      document.querySelectorAll('span')[0].innerHTML = data( div, 'test').first;
      document.querySelectorAll('span')[1].innerHTML = data( div, 'test').last;
    </script>
     
    </body>
    </html>

### Demo:

<iframe width="100%" height="250"></iframe>

## data( element, [key] )

**Description:** Returns value at named data store for the element, as set by `data(element, name, value)`, by an HTML5 `data-*` attribute. If no key is provided, the full data store for the element is returned.

- version 1
  - **element**<br>
    Type: Element<br>
    The DOM element to query for the data.
    
  - **key**<br>
    Type: String<br>
    Name of the data stored.
    
- version 2
  - **element**<br>
    Type: Element<br>
    The DOM element to query for the data.


The `data()` method allows us to attach data of any type to DOM elements in a way that is safe from circular references and therefore from memory leaks. We can retrieve several distinct values for a single element one at a time, or as a set:

    alert( data( document.body, 'foo' ) );
    alert( data( document.body ) );


The above lines alert the data values that were set on the `body` element. If nothing was set on that element, `undefined` is returned.


### HTML5 data-* Attributes

HTML5 `data-*` attributes will be automatically pulled in to lego-data's object. The treatment of attributes with embedded dashes conforms with the W3C HTML5 specification.

For example, given the following HTML:

    <div data-role="page" data-last-value="43" data-hidden="true" data-options='{"name":"John"}'></div>

All of the following jQuery code will work.

    data( el, 'role' ) === 'page';
    data( el, 'lastValue' ) === 43;
    data( el, 'hidden' ) === true;
    data( el, 'options' ).name === 'John';
    
The second statement of the code above correctly refers to the `data-last-value` attribute of the element. In case no data is stored with the passed key, lego-data searches the `dataset` of the element. For more information of how the dataset please refer to WC3's specification page **[needlink]**.

When the data attribute is an object (starts with '{') or array (starts with '[') then jQuery.parseJSON is used to parse the string; it must follow valid JSON syntax including quoted property names. If the value isn't parseable as a JavaScript value, it is left as a string.

No attempt is made to convert the `data-*` string to any other datatype. If the value is JSON, then you'll need to run the value through `JSON.parse`.

The `data-*` attributes are pulled in the first time the data key is accessed and then is no longer accessed or mutated (all data values are then stored internally in lego-data).

Calling `data( element )` retrieves all of the element's associated values as a JavaScript object. Note that other plugins may use this method to store data, so do not assume that it contains only data that your own code has stored.

### Example:

Get the data named 'blah' stored at for an element.

    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>data demo</title>
    <style>
      div {
        margin: 5px;
        background: yellow;
      }
      button {
        margin: 5px;
        font-size: 14px;
      }
      p {
        margin: 5px;
        color: blue;
      }
      span {
        color: red;
      }
    </style>
    <script src="build/es5-data.js"></script>
    </head>
    <body>
    
    <div>A div</div>
    <button>Get "blah" from the div</button>
    <button>Set "blah" to "hello"</button>
    <button>Set "blah" to 86</button>
    <p>The "blah" value of this div is <span>?</span></p>
    
    <script>
    
      var buttons = document.querySelectorAll('button');
      var span = document.querySelector('span')
      
      buttons[0].addEventListener('click', function() {
        span.innerHTML = data( this, 'blah' );
      });
      
      buttons[1].addEventListener('click', function() {
        data( this, 'blah', 'hello' );
        span.innerHTML = 'Stored!';
      });
      
      buttons[2].addEventListener('click', function() {
        data( this, 'blah', 86 );
        span.innerHTML = 'Stored!';
      });

    </script>
    
    </body>
    </html>

### Demo:

<iframe width="100%" height="250"></iframe>
