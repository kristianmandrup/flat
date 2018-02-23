# TODO

## Logger

Drop `Logger` inheritance, except perhaps as fallback. Instead inject `logger` in `Flattener` and pass down.

Partly done:

- Add `logWhenNamed` option that can be either an array or function.
- Add `logWhen` option

## Publish/subscribe post value generation

For each value, add option to subscribe for lazy/post generation.
Currently there is experimental support for this, but it hasn't really been tested.

## Async support

Added experimental support for async flatten/unflatten via:

- `flatAsync`
- `unflatAsync`

Needs more refactoring/cleanup and testing! Use `async` mode getter inside each to determine return value to use?

## Unflatten

- Add custom `getKeys` function (or list?) to get list of keys to iterate
- Add `keysFilter` of keys, including perhaps an `excludeKeys` list.
- Add `skip` function to skip processing of individual flat key based on name/value
- Add `valueSrc` to override looking up values by key in `target`
- Add `lookupValueAt` function to lookup value for current flat key. Can be in any external location, f.ex using options
- Add alias `keyName` to `keynames` for leaf.

## Tests

Write full test suites for all skeleton test files