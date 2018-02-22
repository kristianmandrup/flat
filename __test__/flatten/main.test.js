const {
  flatten
} = require('../../')
const flat = flatten

const {
  log
} = console

describe('Flatten', () => {
  it('Custom Delimiter', () => {
    expect(flatten({
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

  it('To upper case', () => {

    it('Custom keyname', () => {
      expect(flatten({
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

    it('To lower case', () => {
      expect(
        flatten({
          HELLO: {
            WORLD: {
              AGAIN: 'good morning'
            }
          }
        }, {
          toLowerCase: true,
          logging: true,
          logOnly: ['Flattener']
        }),

        {
          'hello.world.again': 'good morning',

          keyname: function (prev, key) {
            return prev ? prev + ':' + key : ':' + key
          }
        })
    })
  })

  it('Empty Objects', () => {
    expect(flatten({
      hello: {
        empty: {
          nested: {}
        }
      }
    }), {
      'hello.empty.nested': {}
    })
  })

  it('Identity', () => {
    const object = {
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
    expect(flat1, flat2)
  })

  if (typeof Buffer !== 'undefined') it('Buffer', () => {
    expect(flatten({
      hello: {
        empty: {
          nested: new Buffer('test')
        }
      }
    }), {
      'hello.empty.nested': new Buffer('test')
    })
  })

  if (typeof Uint8Array !== 'undefined') test.skip('typed arrays', () => {
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

    expect(flatWArray, expectedWArray)
  })

  it('Custom Depth', () => {
    expect(flatten({
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
