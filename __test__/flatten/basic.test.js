const {
  flatten
} = require('../../index')
const flat = flatten

describe('Flatten', () => {
  it('Nested once', () => {
    const result = flatten({
      hello: {
        world: 'good morning'
      }
    }, {
      logging: true,
      logOnly: ['Flattener']
    })

    expect(result).toEqual({
      'hello.world': 'good morning'
    })
  })

  it('Nested twice', () => {
    let result = flatten({
      hello: {
        world: {
          again: 'good morning'
        }
      }
    }, {
      // logging: true
    })

    expect(result).toEqual({
      'hello.world.again': 'good morning'
    })
  })

  it('Multiple Keys', () => {
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

    expect(result).toEqual({
      'hello.lorem.ipsum': 'again',
      'hello.lorem.dolor': 'sit',
      'world.lorem.ipsum': 'again',
      'world.lorem.dolor': 'sit'
    })
  })
})
