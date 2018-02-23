const {
  makePointer
} = require('..')

describe('option: selectAt', () => {
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
    const selectAt = 'oops'

    const result = () => makePointer(obj, path, {
      selectAt
    })

    expect(result).toThrow()
  })

  it('function does NOT return a key/value selection', () => {
    const selectAt = () => 42

    const result = () => makePointer(obj, path, {
      selectAt
    })

    expect(result).toThrow()
  })

  it('function returns only a key', () => {
    const selectAt = () => {
      return {
        key: 'myKey'
      }
    }


    const result = () => makePointer(obj, path, {
      selectAt
    })

    expect(result).toThrow()
  })

  it('function returns only a value, which is not an object', () => {
    const selectAt = () => {
      return {
        value: 42
      }
    }

    const result = () => makePointer(obj, path, {
      selectAt
    })

    expect(result).toThrow()
  })

  it('function returns only an empty value object', () => {
    const selectAt = () => {
      return {
        value: {}
      }
    }

    const result = () => makePointer(obj, path, {
      selectAt
    })

    expect(result).not.toThrow()
  })

  it('function returns a key/value selection', () => {
    const selectAt = () => {
      return {
        key: 'myKey',
        value: {}
      }
    }

    const result = () => makePointer(obj, path, {
      selectAt
    })

    expect(result).not.toThrow()
  })
})
