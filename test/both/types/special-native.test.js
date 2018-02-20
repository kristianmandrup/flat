const assert = require('assert')
const {
  flatten,
  unflatten
} = require('../../flat')
const flat = flatten

if (typeof Buffer !== 'undefined') test('Buffer', function () {
  assert.deepEqual(unflatten({
    'hello.empty.nested': new Buffer('test')
  }), {
    hello: {
      empty: {
        nested: new Buffer('test')
      }
    }
  })
})
