const {
  flatten
} = require('../../flat')
const flat = flatten

describe('.safe', () => {
  it('Should protect arrays when true', () => {
    const result = flatten({
      hello: [{
        world: {
          again: 'foo'
        }
      }, {
        lorem: 'ipsum'
      }],
      another: {
        nested: [{
          array: {
            too: 'deep'
          }
        }]
      },
      lorem: {
        ipsum: 'whoop'
      }
    }, {
      safe: true
    })

    expect(result).toEqual({
      hello: [{
        world: {
          again: 'foo'
        }
      }, {
        lorem: 'ipsum'
      }],
      'lorem.ipsum': 'whoop',
      'another.nested': [{
        array: {
          too: 'deep'
        }
      }]
    })
  })

  it('Should not protect arrays when false', () => {
    const result = flatten({
      hello: [{
        world: {
          again: 'foo'
        }
      }, {
        lorem: 'ipsum'
      }]
    }, {
      safe: false
    })
    expect(result).toEqual({
      'hello.0.world.again': 'foo',
      'hello.1.lorem': 'ipsum'
    })
  })
})
