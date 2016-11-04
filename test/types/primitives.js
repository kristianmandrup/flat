const assert = require('assert')
const { flatten, unflatten } = require('../../index')
const flat = flatten

var primitives = {
    String: 'good morning'
  , Number: 1234.99
  , Boolean: true
  , Date: new Date
  , null: null
  , undefined: undefined
}

suite('Flatten Primitives', function() {
  Object.keys(primitives).forEach(function(key) {
    var value = primitives[key]

    test(key, function() {
      assert.deepEqual(flatten({
        hello: {
          world: value
        }
      }), {
        'hello.world': value
      })
    })
  })
})

suite('Unflatten Primitives', function() {
  Object.keys(primitives).forEach(function(key) {
    var value = primitives[key]

    test(key, function() {
      assert.deepEqual(unflatten({
        'hello.world': value
      }), {
        hello: {
          world: value
        }
      })
    })
  })
})
