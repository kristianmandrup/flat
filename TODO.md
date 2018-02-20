# TODO

## Logger

Drop `Logger` inheritance, except perhaps as fallback.
Instead inject `logger` in `Flattener` and pass down.

- Add references to `flattener` and `stepper` within `logger`

Partly done:

- Add `logWhenNamed` option that can be either an array or function.
- Add `logWhen` option

## Publish/subscribe post value generation

For each value, add option to subscribe for lazy/post generation.

Currently there is experimental support for this, but it hasn't really been tested.
