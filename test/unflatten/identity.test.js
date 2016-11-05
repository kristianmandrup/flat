var assert = require('assert')
const { flatten, unflatten } = require('../flat')

test('Identity', function() {
  var object = { foo: { bar: 'baz' } }

  assert.strictEqual(unflatten(object), unflatten(object))
});