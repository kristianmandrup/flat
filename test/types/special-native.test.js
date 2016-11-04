const assert = require('assert')
const { flatten, unflatten } = require('../../index')
const flat = flatten

if (typeof Buffer !== 'undefined') test('Buffer', function() {
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

if (typeof Uint8Array !== 'undefined') test('typed arrays', function() {
  assert.deepEqual(unflatten({
    'hello.empty.nested': new Uint8Array([1,2,3,4])
  }), {
    hello: {
      empty: {
        nested: new Uint8Array([1,2,3,4])
      }
    }
  })
})
