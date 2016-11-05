const assert = require('assert')
const { flatten, unflatten } = require('../../flat')
const flat = flatten

suite('.filter', function() {
  var everything = function() { return false }
  var nothing = function() { return true }
  var ifHasName = function(obj) { return !obj.name }

  test('Should let a custom check decide if object should be flattened', function () {
    var fixture = {
      hello: {
        world: 'hello',
        good: {
          bye: 'my friend'
        },
        something: {
          nested: {
            pretty: {
              deep: true
            },
            name: 'hello'
          }
        },
        array: ['of', 'values']
      }
    }

    assert.deepEqual(flat(fixture, { filter: everything }), fixture)

    assert.deepEqual(flat(fixture, { filter: nothing }), {
      'hello.world': 'hello',
      'hello.good.bye': 'my friend',
      'hello.something.nested.pretty.deep': true,
      'hello.something.nested.name': 'hello',
      'hello.array.0': 'of',
      'hello.array.1': 'values'
    })

    assert.deepEqual(flat(fixture, { filter: ifHasName }), {
      'hello.world': 'hello',
      'hello.good.bye': 'my friend',
      'hello.something.nested': {
        pretty: {
          deep: true
        },
        name: 'hello'
      },
      'hello.array.0': 'of',
      'hello.array.1': 'values'
    })
  })
})
