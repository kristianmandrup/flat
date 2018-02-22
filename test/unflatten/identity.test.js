const assert = require('assert')
const {
  unflatten
} = require('../flat')

test('Identity', function () {
  const object = {
    foo: {
      bar: 'baz'
    }
  }

  assert.strictEqual(unflatten(object), unflatten(object))
});
