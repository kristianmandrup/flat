# flat2

Flatten a nested Javascript object any way you like. Designed to be highly customisable

Also contains a customisable unflattener.

## Intro

This library is a fully rewritten version of [flat](https://www.npmjs.com/package/flat).

`flat2` has been designed using ES6 classes to make for a more composable, flexible and more maintainable library.

It should now be much easier to test, debug and extend. It is designed to be way more customisable and flexible than the original `flat`. Please also consider the alternative libs listed at the end of this Readme.

## Status

All tests pass except for `typed arrays` which is rarely used in any case.
I welcome a PR to fix this little issue.

## Installation

```bash
$ npm install flat2 --save
```

## What is included

- `Unflattener`
- `Flattener`

 The `Flattener` is currently more mature.

## Unflattener

Can be used as follows:

```js
import {
  createUnflattener,
  unflatten
} from 'flat2'

const unflattener = createUnflattener(nested, opts)
const obj = unflattener.unflat()

// alternative
const obj2 = unflatten(nested, opts)
```

## Options

### default options

The Unflattener contains a `defaults` property with the following defaults

```js
{
  makeLeaf: leaf,
  delimiter: ':',
  setValue(value) {
    return value
  },
  pathFinder(key) {
    return key.split(this.delimiter)
  }
}
```

These defaults can be overriden by setting `_defaults` or by overriding the `defaults` property (getter).

### makeLeaf

Function to create a new (deeply nested) leaf node using the path and value

`leaf(obj, path, value, opts = {})`

Sets nested key/value on `obj` which is returned.

- `obj` is the target (output) object
- `path` is an array of keys or a string with delimiter
- `value` is the value to set for the key in the (deeply nested) path
- `opts` object with any extra options to use

#### opts

Will be retrieved using `leafOpts` property (getter) of `Unflattener`, which you can override. By default passes on all `opts` of `Unflattener` and the current `key` being processed.

- `delimiter` option (default: `.`)
- `key` the flat key the leaf is being created for
- `makePointer` custom function to create the pointer (deep path) in the object
- `setValue` custom function to use to set the value (by default the *identity* function, ie. simply returns the passed-in value)

### pathFinder

Function to generate a deep path from a key

`pathFinder(key): string[]`

Can f.ex be used to generate a path from a camelCased string using some RegExp magic.

### delimiter

Delimiter to use for default path finder if no specialised `pathFinder` is provided

### leaf default options

The built-in leaf function uses the following default options

```js
{
  delimiter: '.',
  setValue(value) {
    return value
  },
  pointer(obj, path) {
    return path.reduce((acc, key) => {
      if (acc[key] === undefined) acc[key] = {};
      return acc[key];
    }, obj)
  }
}
```

## Flattener

### flatten(obj, opts)

Creates a flattener, flattens the object and returns the result.

```js
const { flatten } = require('flat2')

const flatObj = flatten({
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

## Flattener

Instead of using the convenience `flatten` function, you can also option to instantiate a `Flattener` instance for reuse, to flatten multiple objects.

The flattener is *reset* at the start of each flatten operation.

### createFlattener(obj, options)

Returns a `flattener` instance.

```js
const { createFlattener } = require('flat2')

const flattener = createFlattener(obj1, opts)
```

Use `flattener.flat(obj)` to flatten objects

```js
// flatten using initial target
const flatObj1 = flattener.flat()

// reuse flattener and flatten with new target
const flatObj2 = flattener.flat(obj2)
```

You can also import the `Flattener` class and use `new` or extend it to create your own custom `Flattener`

```js
import {
  Flattener
} from 'flat2'

class MyFlattener extends Flattener {
  // custom overrides/extensions
}

const flattener = new MyFlattener(obj, opts)

/// use it!
const flatObj = flattener.flatten()
```

## Options

The following are the supported options, ie. second argument to `flatten` function (or `Flattener` constructor)

### delimiter

Use a custom delimiter for (un)flattening your objects, instead of `.`.

```js
flatten(obj, {
  delimiter: ':'
}
```


## Transform options

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

Currently you can supply a `logWhen` option that takes an `object` which can be an instance of either:

- `Flattener`
- `Stepper`
- `KeyStepper`
- `FlatKey`

All of these instances should have access to `flattener` where you have access to attributes such as:

- `currentDepth`
- `lastAncestorKey`
- `ancestorKeys`
- `lvKeys` (via current `stepper` attached)

You can use these attributes to further control when to log.

See `TODO.md` for our `Logger` plans.

### logger option

You can pass your own custom logger in the new `logger` option.

The custom logger can implement one or more of the following:

- `log(...args)`
- `objLog(...args)`

The default `Logger` methods:

```js
log(...args) {
  this.shouldLog && logInfo(this.name, ...args)
}

objLog(...args) {
  this.shouldLog && logObj(this.name, ...args)
}
```

Your custom `logger` can be an instance of your custom logger class that extends `Logger` (also exported for convenience)

Example:

```js
import {
  Logger,
  // ...
} from 'flat2`

class MyLogger extends Logger {
  constructor(flattener, opts) {
    super(opts)
    this.flattener = flattener
  }

  get shouldLog() {
    // custom conditions
  }
}

const flattener = createFlattener(obj, opts)

const loggingOpts = {
  logging: true,
  // ... custom opts ?
}

const logger = new MyLogger(flattener, loggingOpts)

flattener.logger = logger

// now ready to use flattener with new logger!
```

### TODO: Improved logger and composition

We would welcome a PR with more detailed logging constraints, such as current depth level, keys visited etc. and using composition instead of deep inheritance

## Publish/Subscribe

It might sometimes be useful to have a way to post generate the output values after the fact using the information available at the time of generation for each flat key.

This can f.ex be useful for mapping values (pointers) from the nested to the flat structure.

You can now pass a `subscribeValue` callback, which can be called after the fact by the flattener.

```js
import {
  leaf,
  // ... more refs imported
} from 'flat2'

function subscribeValue(newKey, newValue, {
  target,
  ancestorKeys
})
  leaf(target, ancestorKeys.join('.'), newValue)
}
```

The function [leaf](https://stackoverflow.com/a/46818701) is also included and exported.

```js
function leaf(obj, path, value) {
  const pList = path.split('.');
  const key = pList.pop();
  const pointer = pList.reduce((accumulator, currentValue) => {
    if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
    return accumulator[currentValue];
  }, obj);
  pointer[key] = value;
  return obj;
}
```

This way you can map the deeply nested leaf values of a target object to point to leaf values in an obj with the flat key structure.

```js
// assuming flatStruct has structure mirroring object of returned by flatten
const styles = createStyleSheet(flatObj)
const nestedStyles = {}
flattener.publishObj(styles, target)
```

Now `nestedStyles.card.container` will point to `styles.cardContainer` and so on ;)

Note: You can also publish key/value pair individually using `flattener.publish(key, value, target)`

See also: [Safely accessing deeply nested values](https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a)

For this use case you can alternatively use `unflatten` with a custom `pathFinder` option, but you might be more contrained. The publish/subscribe is more powerful.

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