const assert = require('assert')
const {
  unflatten
} = require('../flat')

const log = console.log

suite('Unflatten', function () {
  test('Nested once', function () {
    let result = unflatten({
      'hello.world': 'good morning'
    }, {
      logging: true
    })

    log('result', result)

    assert.deepEqual(result, {
      hello: {
        world: 'good morning'
      }
    })
  })

  test('Nested twice', function () {
    assert.deepEqual({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    }, unflatten({
      'hello.world.again': 'good morning'
    }))
  })

  test('Multiple Keys', function () {
    assert.deepEqual({
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
    }, unflatten({
      'hello.lorem.ipsum': 'again',
      'hello.lorem.dolor': 'sit',
      'world.lorem.ipsum': 'again',
      'world.lorem.dolor': 'sit'
    }))
  })

  test('Custom Delimiter', function () {
    assert.deepEqual({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    }, unflatten({
      'hello world again': 'good morning'
    }, {
      delimiter: ' '
    }))
  })

  test('Custom keynames', function () {
    assert.deepEqual({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    }, unflatten({
      ':hello:world:again': 'good morning'
    }, {
      keynames: function (key) {
        return key.substr(1).split(':')
      }
    }))
  })

  test('Overwrite', function () {
    assert.deepEqual({
      travis: {
        build: {
          dir: "/home/travis/build/kvz/environmental"
        }
      }
    }, unflatten({
      travis: "true",
      travis_build_dir: "/home/travis/build/kvz/environmental"
    }, {
      delimiter: '_',
      overwrite: true,
    }))
  })

  test('Messy', function () {
    let src = {
      hello: {
        world: 'again'
      },
      lorem: {
        ipsum: 'another'
      },
      good: {
        morning: {
          hash: {
            key: {
              nested: {
                deep: {
                  and: {
                    even: {
                      deeper: {
                        still: 'hello'
                      }
                    }
                  }
                }
              }
            }
          },
          again: {
            testing: {
              'this': 'out'
            }
          }
        }
      }
    }

    let objAfter = {
      'hello.world': 'again',
      'lorem.ipsum': 'another',
      'good.morning': {
        'hash.key': {
          'nested.deep': {
            'and.even.deeper.still': 'hello'
          }
        }
      },
      'good.morning.again': {
        'testing.this': 'out'
      }
    }

    assert.deepEqual(obj, unflatten(objAfter))
  })
})
