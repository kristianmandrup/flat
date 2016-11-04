var assert = require('assert')
  , flat = require('../../index')
  , flatten = flat.flatten
  , unflatten = flat.unflatten

test('Isomorphism', function() {
  var original = { foo: 'bar' }

  assert.strictEqual(
    original,
    flatten(unflatten(original))
  )

  assert.strictEqual(
    original,
    unflatten(flatten(original))
  )
});
