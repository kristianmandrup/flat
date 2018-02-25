const {
  makePointer
} = require('..')

describe('option: createKey', () => {
  const createObj = () => {
    return {
      'x': {
        a: 32
      }
    }
  }

  path = ['x']
  value = 'hello'

  let obj
  beforeEach(() => {
    obj = createObj()
  })

  it('not a function', () => {
    const createKey = 'oops'

    const result = () => makePointer(obj, path, {
      createKey
    })

    expect(result).toThrow()
  })

  it('function does NOT transform key to string', () => {
    const createKey = () => 42

    const result = () => makePointer(obj, path, {
      createKey
    })

    expect(result).toThrow()
  })

  it('function does transform key to string', () => {
    const createKey = () => 'myKey'

    const result = () => makePointer(obj, path, {
      createKey
    })

    expect(result).toThrow()
  })
})
