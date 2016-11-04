var assert = require('assert')
  , flat = require('../../index')
  , flatten = flat.flatten
  , unflatten = flat.unflatten

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

  test('Nested twice', function() {
    assert.deepEqual(flatten({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    }), {
      'hello.world.again': 'good morning'
    })
  })

  test('Multiple Keys', function() {
    assert.deepEqual(flatten({
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
    }), {
      'hello.lorem.ipsum': 'again',
      'hello.lorem.dolor': 'sit',
      'world.lorem.ipsum': 'again',
      'world.lorem.dolor': 'sit'
    })
  })

  test('Custom Delimiter', function() {
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

  test('To upper case', function() {

    test('Custom keyname', function() {
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

    test('To lower case', function() {
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

          keyname: function(prev, key) {
            return prev ? prev + ':' + key : ':' + key
          }
        })
    })
  })

  test('Empty Objects', function() {
    assert.deepEqual(flatten({
      hello: {
        empty: {
          nested: { }
        }
      }
    }), {
      'hello.empty.nested': { }
    })
  })

  test('Identity', function() {
    var object = { foo: 'baz', fiz: 'fuz' }

    assert.strictEqual(flatten(object), flatten(object))
  })

  if (typeof Buffer !== 'undefined') test('Buffer', function() {
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

  if (typeof Uint8Array !== 'undefined') test('typed arrays', function() {
    assert.deepEqual(flatten({
      hello: {
        empty: {
          nested: new Uint8Array([1,2,3,4])
        }
      }
    }), {
      'hello.empty.nested': new Uint8Array([1,2,3,4])
    })
  })

  test('Custom Depth', function() {
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