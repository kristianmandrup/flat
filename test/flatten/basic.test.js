const assert = require('assert')
const { flatten, unflatten } = require('../../index')
const flat = flatten

suite('Flatten', function() {
  test('Nested once', function() {
    assert.deepEqual(flatten({
      hello: {
        world: 'good morning'
      }
    }), {
      'hello.world': 'good morning'
    })
  })

  // test('Nested twice', function() {
  //   assert.deepEqual(flatten({
  //     hello: {
  //       world: {
  //         again: 'good morning'
  //       }
  //     }
  //   }), {
  //     'hello.world.again': 'good morning'
  //   })
  // })

  // test('Multiple Keys', function() {
  //   assert.deepEqual(flatten({
  //     hello: {
  //       lorem: {
  //         ipsum: 'again',
  //         dolor: 'sit'
  //       }
  //     },
  //     world: {
  //       lorem: {
  //         ipsum: 'again',
  //         dolor: 'sit'
  //       }
  //     }
  //   }), {
  //     'hello.lorem.ipsum': 'again',
  //     'hello.lorem.dolor': 'sit',
  //     'world.lorem.ipsum': 'again',
  //     'world.lorem.dolor': 'sit'
  //   })
  // })
})