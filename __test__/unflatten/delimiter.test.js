const {
  unflatten
} = require('../flat')

const log = console.log

describe('Unflatten: delimiter', () => {
  const obj = {
    'x.y': {
      a: 32
    }
  }

  it('delimiter not valid', () => {
    const delimiter = 42
    const result = () => unflatten(obj, {
      delimiter
    })

    expect(result).toThrow()
  })
  it('camelCase - no such key', () => {
    const delimiter = 'camelCase'
    const result = () => unflatten(obj, {
      delimiter
    })

    expect(result).not.toThrow()
    expect(typeof result).toBe('object')
    expect(obj).toBe(obj)
  })

  it('camelCase - matches key', () => {
    const obj = {
      'abeZebra': {
        a: 32
      }
    }

    const delimiter = 'camelCase'
    const result = () => unflatten(obj, {
      delimiter
    })

    expect(result).not.toThrow()
    expect(typeof result).toBe('object')
    expect(obj).not.toBe(obj)
    const abe = obj.abe
    expect(abe).toBeDefined()
    expect(abe.Zebra).toBeDefined()
  })

  it('custom valid delimiter', () => {
    const obj = {
      'x:y': {
        a: 32
      }
    }

    const delimiter = ':'
    const result = () => unflatten(obj, {
      delimiter
    })

    expect(result).not.toThrow()
    expect(typeof result).toBe('object')
    expect(obj).not.toBe(obj)
    const x = obj.x
    expect(x).toBeDefined()
    expect(x.y).toBeDefined()

  })
})
