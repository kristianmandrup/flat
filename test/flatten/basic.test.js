const assert = require('assert')
const { flatten, unflatten } = require('../../index')
const flat = flatten

suite('Flatten', function() {
  test('Nested once', function() {
    let result = flatten({
      hello: {
        world: 'good morning'
      }
    }, {logging: true})

    assert.deepEqual(result, {
      'hello.world': 'good morning'
    })
  })

  test('Nested twice', function() {
    let result = flatten({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    }, {logging: true})

    assert.deepEqual(result, {
      'hello.world.again': 'good morning'
    })
  })

  test('Multiple Keys', function() {
    let result = flatten({
      hello: {
        lorem: {
          ipsum: 'again',
          dolor: 'sit'
        }
      },
      world: {
        lorem: {
          ipsum: 'again',
          dolor: 'sit'
        }
      }
    })

    // console.log('RESULT', result)

    assert.deepEqual(result, {
      'hello.lorem.ipsum': 'again',
      'hello.lorem.dolor': 'sit',
      'world.lorem.ipsum': 'again',
      'world.lorem.dolor': 'sit'
    })
  })
})