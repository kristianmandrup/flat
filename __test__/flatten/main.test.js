const {
  flatten
} = require('../../')
const flat = flatten

const {
  log
} = console

describe('Flatten', () => {
  it('Custom Delimiter', () => {
    const result = flatten({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    }, {
      delimiter: ':'
    })

    expect(result).toEqual({
      'hello:world:again': 'good morning'
    })
  })

  describe('To upper case', () => {

    it('transforms key to upper case', () => {
      const result = flatten({
        hello: {
          world: {
            again: 'good morning'
          }
        }
      }, {
        toUpperCase: true
      })

      expect(result).toEqual({
        'HELLO.WORLD.AGAIN': 'good morning'
      })
    })
  })
  describe('To lower case', () => {
    it('transforms key to lower case', () => {
      const result = flatten({
        HELLO: {
          WORLD: {
            AGAIN: 'good morning'
          }
        }
      }, {
        toLowerCase: true,
        logging: true,
        logOnly: ['Flattener']
      })

      expect(result).toEqual({
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

    expect(flat1).toEqual(flat2)
  })

  if (typeof Buffer !== 'undefined') it('Buffer', () => {
    const result = flatten({
      hello: {
        empty: {
          nested: new Buffer('test')
        }
      }
    })
    expect(result).toEqual({
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

    expect(flatWArray).toEqual(expectedWArray)
  })

  it('Custom Depth', () => {
    const result = flatten({
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
    })

    expect(result).toEqual({
      'hello.world': {
        again: 'good morning'
      },
      'lorem.ipsum': {
        dolor: 'good evening'
      }
    })
  })
})
