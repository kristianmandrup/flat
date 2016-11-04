var assert = require('assert')
  , flat = require('../index')
  , flatten = flat.flatten
  , unflatten = flat.unflatten

var assert = require('assert')
  , flat = require('../index')
  , flatten = flat.flatten
  , unflatten = flat.unflatten

test('Identity', function() {
  var object = { foo: { bar: 'baz' } }

  assert.strictEqual(unflatten(object), unflatten(object))
});