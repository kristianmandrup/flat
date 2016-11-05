const assert = require('assert')
const { flatten, unflatten } = require('../../flat')
const flat = flatten

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
