const {
  leaf
} = require('..')

const {
  log
} = console

describe('leaf: option - defaults', () => {
  const createObj = () => {
    return {
      'x': {
        a: 32
      }
    }
  }

  let obj
  beforeEach(() => {
    obj = createObj()
  })

  path = ['x']
  value = 'hello'

  it('not an object', () => {
    const defaults = 'oops'

    const result = () => leaf(obj, path, value, {
      defaults
    })

    expect(result).toThrow()
  })
  it('an empty object', () => {
    const defaults = {}

    const result = () => leaf(obj, path, value, {
      defaults
    })

    expect(result).not.toThrow()
  })
  it('object w unknown keys ignored', () => {
    const defaults = {
      x: 32
    }

    const result = () => leaf(obj, path, value, {
      defaults
    })

    expect(result).not.toThrow()
  })
  it('object w some known options defined', () => {
    const defaults = {
      logger: {

      },
      shallow: false,
      overwrite: false
    }

    const result = () => leaf(obj, path, value, {
      defaults
    })

    expect(result).not.toThrow()
  })
})
