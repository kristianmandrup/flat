var assert = require('assert')
const {
  unflatten
} = require('../flat')

test('Identity', function () {
  var object = {
    foo: {
      bar: 'baz'
    }
  }

  assert.strictEqual(unflatten(object), unflatten(object))
});
