# flat2

Flatten a nested Javascript object any way you like. Designed to be highly customisable

## Intro

This library is a fully rewritten version of [flat](https://www.npmjs.com/package/flat).

`flat2` has been designed using ES6 classes to make for a more composable, flexible and more maintainable library.

It should now be much easier to test, debug and extend. It is designed to be way more customisable and flexible than the original `flat`. Please also consider the alternative libs listed at the end of this Readme.

## Status

All tests pass except for `typed arrays` which is rarely used in any case.
I welcome a PR to fix this little issue.

## Installation

```bash
$ npm install flat2
```

## Methods

### flatten(obj, options)

Flattens the object - it'll return an object one level deep, regardless of how
nested the original object was:

```js
const { flatten } = require('flat2')

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

By default uses `.` as the delimiter. The key generation can be customised in many ways by passing options.

## Options

The following are the supported options (second argument to flatten)

### delimiter

Use a custom delimiter for (un)flattening your objects, instead of `.`.

```js
flatten(obj, {
  delimiter: ':'
}
```

### toUpperCase

Use `toUpperCase` option for flattening your objects and upper case object keys at the same time. This can be handy when working with constants, i.e. `API_KEY: 'some key'`. This is a built in key transform.

```js
flatten(obj, {
  toUpperCase: true
}
```

### toLowerCase

Use a `toLowerCase` option for flattening your objects and lower case object keys at the same time. This is a built in key transform.

```js
flatten(obj, {
  toLowerCase: true
}
```

### keyType

Use a built in type of key transformation function:

- `snakeCase` (ie. `ale_beta_zeta`)
- `camelCase` (ie. `aleBetaZeta`)

```js
flatten(obj, {
  keyType: 'snakeCase'
}
```

## Advanced Configuration options

You can use the following options to further customize how keys are generated

### transformKeyFn

Use a custom function to transform object keys (as opposed to built in transforms such as `toLowerCase` and `toUpperCase`). A transform is applied after the key name has been generated.

```js
flatten(obj, {
  transformKeyFn: (key) => mySpecialTransform(key)
}
```

### keyNameFn

Use a custom `function` to flatten the keyname. By default, the `delimiter` is inserted between `prev` and `next`

Here's an example that uses a colon (`:`) to both prefix and delimit the keyname

````js
var obj = {
  hello: {
    world: {
      again: 'good morning'
}}}

flatten(obj, { keyNameFn: function(prev, next) {
  return prev
    ? prev + ':' + next // delimit
    : ':' + next // prefix
}})

// {
//  ':hello:world:again': 'good morning'
// }
````

### createKeyNameFn

Use a custom factory function to create the keyname function.

```js
const {
  myDefaultKeyNameFn,
  createMySpecialKeyNameFn
} = './key-functions'

flatten(obj, {
  createKeyNameFn(opts) {
    return opts.special ? createMySpecialKeyNameFn(opts) : myDefaultKeyNameFn
  }
})
```

### createFlatKeyFn

Use `createFlatKeyFn` to pass a factory that generates a function which implements the `FlatKey` interface (see `FlatKeyClass` below)

```js
const {
  myFlatKey,
} = './key-functions'

flatten(obj, {
  createFlatKeyFn(opts) {
    return function (opts) {
      return {
        config(prev, next) {
          // ...
        }
        get name() {
          //
        }
      }
    }
  }
})
```

### FlatKeyClass

Use a custom `FlatKey` class. Must implement the following interface:

- `config(key, prev)`
- `name` getter

It is used by the default `keyNameFn` to generate each keyname as follows

```js
  return (key, prev) => {
    return flatKey.config(key, prev).name
  }
```

## Internal Flow configuration

In case you want to customize the internal flow logic:

### createStepper

To pass a custom `createStepper` function to override the built-in `createStepper` factory. You can f.ex extend the `Stepper` class with your customisations.

```js
function createStepper(object, {
  flattener,
  prev,
  currentDepth
}) {
  return new MyStepper(object, {
    flattener,
    prev,
    currentDepth
  })
}

flatten(obj, {
  createStepper
})
```

### createKeyStepper

To pass a custom `createKeyStepper` function to override the built-in `createKeyStepper` factory. You can f.ex extend the `KeyStepper` class with your customisations.

```js
function createKeyStepper(key, { stepper, flattener }) {
  return new MyKeyStepper(key, { stepper, flattener })
}

flatten(obj, {
  createKeyStepper
})
```

## Customized output

### transformValue

Pass a `transformValue` function as option to fine-tune if/how leaf values are transformed. By default the value is returned, but you have access to loads of information to fine-tune if necessary.

```js
function transformValue(value, {
  target,
  key,
  newKey,
  prevKey,
  ancestorKeys,
  lvKeys
}) {
  return value
}
```

## Modes

You can enable `safe` mode to preserve values such as arrays.

### safe

When enabled `flat` will preserve arrays and their
contents. This is disabled by default.

```js
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

## Control flow options

### maxDepth

Maximum number of nested objects to flatten.

```js
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

### filter

Decide if a value should be flattened any further

```js
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
```

## Event handlers

The `Flattener` and `Stepper` classes comes with built-in event handlers to maintain stacks of visited nodes. You can override these event handler to suit your own needs.

### Flattener callbacks

- `onKey(key, depth)`
- `onStepsDone(depth)`

These events are used to build the stack of `ancestorKeys` visited while traversing a branch depth first.

### Stepper callbacks

- `onKey(key)`

A stepper steps through all keys on one depth level.

The `onKey` handler of stepper is used to build a stack of visited keys on a particular depth level. It also calls `onKey` for the flattener to allow it to build up its stack.

## Logging

You can pass a boolean `logging` option to enable/disable logging.
Add a `logOnly` option to limit which "classes" should log. A class is any object that has a `name` property (note: `name` will default to `constructor.name`).

```js
flatten({
  HELLO: {
    WORLD: {
      AGAIN: 'good morning'
    }
  }
}, {
  toLowerCase: true,
  logging: true,
  logOnly: ['Flattener']
})
```

We would welcome a PR with more detailed logging constraints, such as current depth level, keys visited etc.

## Alternatives

There are a host of alternative solutions you might want to consider...

### flatten/unflatten libs

- [flat](https://www.npmjs.com/package/flat)
- [flatley](https://www.npmjs.com/package/flatley)
- [b-flat](https://www.npmjs.com/package/b-flat)
- [o-unflatten](https://www.npmjs.com/package/o-unflatten)
- [unflatten](https://www.npmjs.com/package/unflatten)
- [dedelimit](https://www.npmjs.com/package/dedelimit)
- [deeps](https://www.npmjs.com/package/deeps)
- [crystallize](https://www.npmjs.com/package/crystallize)
- [flat-transform](https://www.npmjs.com/package/flat-transform)
- [flat-with-array-length](https://www.npmjs.com/package/flat-with-array-length)
- [flatulence](https://www.npmjs.com/package/flatulence)
- [object-fx](https://www.npmjs.com/package/object-fx)