var assert = require('assert')
  , flat = require('../../index')
  , flatten = flat.flatten
  , unflatten = flat.unflatten

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
