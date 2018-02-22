const {
  unflatten
} = require('../flat')

const log = console.log

describe('Unflatten', () => {
  it('Nested once', () => {
    let result = unflatten({
      'hello.world': 'good morning'
    }, {
      // logging: true
    })

    log('result', result)

    expect(result, {
      hello: {
        world: 'good morning'
      }
    })
  })

  it('Nested twice', () => {
    const obj = unflatten({
      'hello.world.again': 'good morning'
    })
    expect(obj).toEqual({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    })
  })

  it('Multiple Keys', () => {
    const obj = unflatten({
      'hello.lorem.ipsum': 'again',
      'hello.lorem.dolor': 'sit',
      'world.lorem.ipsum': 'again',
      'world.lorem.dolor': 'sit'
    })

    expect(obj).toEqual({
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
  })

  it('Custom Delimiter', () => {
    const result = unflatten({
      'hello world again': 'good morning'
    }, {
      delimiter: ' '
    })
    expect(result).toEqual({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    })
  })

  it('Custom keynames', () => {
    const result = unflatten({
      ':hello:world:again': 'good morning'
    }, {
      keynames: function (key) {
        return key.substr(1).split(':')
      }
    })

    expect(result).toEqual({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    })
  })

  it('Overwrite', () => {
    const result = unflatten({
      travis: "true",
      travis_build_dir: "/home/travis/build/kvz/environmental"
    }, {
      delimiter: '_',
      overwrite: true,
    })

    expect(result).toEqual({
      travis: {
        build: {
          dir: "/home/travis/build/kvz/environmental"
        }
      }
    })
  })

  it('Messy', () => {
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

    const result = unflatten(src)

    expect(result).toEqual(objAfter)
  })
})
