const {
  flatten
} = require('../../flat')
const flat = flatten

describe('.filter', () => {
  const everything = () => {
    return false
  }
  const nothing = () => {
    return true
  }
  const ifHasName = function (obj) {
    return !obj.name
  }

  it('Should let a custom check decide if object should be flattened', () => {
    const fixture = {
      hello: {
        world: 'hello',
        good: {
          bye: 'my friend'
        },
        something: {
          nested: {
            pretty: {
              deep: true
            },
            name: 'hello'
          }
        },
        array: ['of', 'values']
      }
    }

    expect(flat(fixture, {
      filter: everything
    })).toEqual(fixture)

    expect(flat(fixture, {
      filter: nothing
    })).toEqual({
      'hello.world': 'hello',
      'hello.good.bye': 'my friend',
      'hello.something.nested.pretty.deep': true,
      'hello.something.nested.name': 'hello',
      'hello.array.0': 'of',
      'hello.array.1': 'values'
    })

    expect(flat(fixture, {
      filter: ifHasName
    })).toEqual({
      'hello.world': 'hello',
      'hello.good.bye': 'my friend',
      'hello.something.nested': {
        pretty: {
          deep: true
        },
        name: 'hello'
      },
      'hello.array.0': 'of',
      'hello.array.1': 'values'
    })
  })
})
