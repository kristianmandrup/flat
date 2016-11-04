# flat [![Build Status](https://secure.travis-ci.org/hughsk/flat.png?branch=master)](http://travis-ci.org/hughsk/flat)

Take a nested Javascript object and flatten it, or unflatten an object with
delimited keys.

## Installation

``` bash
$ npm install flat
```

## Methods

### flatten(original, options)

Flattens the object - it'll return an object one level deep, regardless of how
nested the original object was:

``` javascript
var flatten = require('flat')

flatten({
    key1: {
        keyA: 'valueI'
    },
    key2: {
        keyB: 'valueII'
    },
    key3: { a: { b: { c: 2 } } }
})

// {
//   'key1.keyA': 'valueI',
//   'key2.keyB': 'valueII',
//   'key3.a.b.c': 2
// }
```

### unflatten(original, options)

Flattening is reversible too, you can call `flatten.unflatten()` on an object:

``` javascript
var unflatten = require('flat').unflatten

unflatten({
    'three.levels.deep': 42,
    'three.levels': {
        nested: true
    }
})

// {
//     three: {
//         levels: {
//             deep: 42,
//             nested: true
//         }
//     }
// }
```

## Options

### delimiter

Use a custom delimiter for (un)flattening your objects, instead of `.`.

<<<<<<< HEAD
### toUpperCase

Use a toUpperCase option for flattening your objects and upper case object keys at the same time.
This can be handy when working with constants, i.e. `API_KEY: 'some key'`

### toLowerCase

Use a toLowerCase option for flattening your objects and lower case object keys at the same time.
=======
### keyname

Use a custom `function` to flatten the keyname.  By default, the `delimiter` is inserted between `prev` and `next`

Here's an example that uses a colon (':') to prefix and delimit the keyname

````javascript
var o = {
  hello: {
    world: {
      again: 'good morning'
}}}

flatten(o, { keyname: function(prev, next) {
  return prev 
    ? prev + ':' + next 
    : ':' + next
}})
      
// {
//  ':hello:world:again': 'good morning'
// }
````

### keynames

Use a custom `function` to unflatten the keyname.  It  returns an array of key names.  This is the inverse of [keyname](#keyname). By default, the `delimiter` is used to [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) the name.
>>>>>>> ca6f4d27ec49830e9a5bef57b61b88e6bb767b9b

### safe

When enabled, both `flat` and `unflatten` will preserve arrays and their
contents. This is disabled by default.


``` javascript
var flatten = require('flat')

flatten({
    this: [
        { contains: 'arrays' },
        { preserving: {
              them: 'for you'
        }}
    ]
}, {
    safe: true
})

// {
//     'this': [
//         { contains: 'arrays' },
//         { preserving: {
//             them: 'for you'
//         }}
//     ]
// }
```

### object

When enabled, arrays will not be created automatically when calling unflatten, like so:

``` javascript
unflatten({
    'hello.you.0': 'ipsum',
    'hello.you.1': 'lorem',
    'hello.other.world': 'foo'
}, { object: true })

// hello: {
//     you: {
//         0: 'ipsum',
//         1: 'lorem',
//     },
//     other: { world: 'foo' }
// }
```

### overwrite

When enabled, existing keys in the unflattened object may be overwritten if they cannot hold a newly encountered nested value:

```javascript
unflatten({
    'TRAVIS': 'true',
    'TRAVIS_DIR': '/home/travis/build/kvz/environmental'
}, { overwrite: true })

// TRAVIS: {
//     DIR: '/home/travis/build/kvz/environmental'
// }
```

Without `overwrite` set to `true`, the `TRAVIS` key would already have been set to a string, thus could not accept the nested `DIR` element.

This only makes sense on ordered arrays, and since we're overwriting data, should be used with care.


### maxDepth

Maximum number of nested objects to flatten.

``` javascript
var flatten = require('flat')

flatten({
    key1: {
        keyA: 'valueI'
    },
    key2: {
        keyB: 'valueII'
    },
    key3: { a: { b: { c: 2 } } }
}, { maxDepth: 2 })

// {
//   'key1.keyA': 'valueI',
//   'key2.keyB': 'valueII',
//   'key3.a': { b: { c: 2 } }
// }
```
<<<<<<< HEAD

### filter

Decide if a value should be flattened any further

```javascript
var flatten = require('flat')

flatten({
    key1: {
        keyA: 'valueI'
    },
    key2: {
        keyB: 'valueII'
    }
}, { filter: (value) => !value.keyA }) // skip key1

// {
//   key1: {
//       keyA: 'valueI'
//   },
//   'key2.keyB': 'valueII'
// }
=======
### shallow

When enabled, nested flattened objects are preserved when unflattening.

```
unflatten({ "foo.bar": { "fiz.fuz": "hello" }})
// { foo: { bar: { "fiz": { "fuz": "hello" } } }

unflatten({ "foo.bar": { "fiz.fuz": "hello" }}, { shallow: true })
// { foo: { bar: { "fiz.fuz": "hello" } }
>>>>>>> db6542a554fbee04fb041bf504b4f1787af6a1db
```
