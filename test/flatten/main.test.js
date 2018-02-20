const assert = require('assert')
const {
  flatten
} = require('../../index')
const flat = flatten

const {
  log
} = console

suite('Flatten', function () {
  test('Custom Delimiter', function () {
    assert.deepEqual(flatten({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    }, {
      delimiter: ':'
    }), {
      'hello:world:again': 'good morning'
    })
  })

  test('To upper case', function () {

    test('Custom keyname', function () {
      assert.deepEqual(flatten({
        hello: {
          world: {
            again: 'good morning'
          }
        }
      }, {
        toUpperCase: true
      }), {
        'HELLO.WORLD.AGAIN': 'good morning'
      })
    })

    test('To lower case', function () {
      assert.deepEqual(
        flatten({
          HELLO: {
            WORLD: {
              AGAIN: 'good morning'
            }
          }
        }, {
          toLowerCase: true
        }),

        {
          'hello.world.again': 'good morning',

          keyname: function (prev, key) {
            return prev ? prev + ':' + key : ':' + key
          }
        })
    })
  })

  test('Empty Objects', function () {
    assert.deepEqual(flatten({
      hello: {
        empty: {
          nested: {}
        }
      }
    }), {
      'hello.empty.nested': {}
    })
  })

  test('Identity', function () {
    var object = {
      foo: 'baz',
      fiz: 'fuz'
    }

    const flat1 = flatten(object)
    const flat2 = flatten(object)
    // log({
    //   flat1,
    //   flat2
    // })
    // assert.strictEqual(flat1, flat2)
    assert.deepEqual(flat1, flat2)
  })

  if (typeof Buffer !== 'undefined') test('Buffer', function () {
    assert.deepEqual(flatten({
      hello: {
        empty: {
          nested: new Buffer('test')
        }
      }
    }), {
      'hello.empty.nested': new Buffer('test')
    })
  })

  if (typeof Uint8Array !== 'undefined') test.skip('typed arrays', function () {
    const uintArr = new Uint8Array([1, 2, 3, 4])

    const flatWArray = flatten({
      hello: {
        empty: {
          nested: uintArr
        }
      }
    })

    const expectedWArray = {
      'hello.empty.nested': uintArr
    }

    assert.deepEqual(flatWArray, expectedWArray)
  })

  test('Custom Depth', function () {
    assert.deepEqual(flatten({
      hello: {
        world: {
          again: 'good morning'
        }
      },
      lorem: {
        ipsum: {
          dolor: 'good evening'
        }
      }
    }, {
      maxDepth: 2
    }), {
      'hello.world': {
        again: 'good morning'
      },
      'lorem.ipsum': {
        dolor: 'good evening'
      }
    })
  })
})
