const {
  leaf
} = require('../leaf')

const {
  log
} = console

describe('leaf: option - defaults', () => {
  const obj = {
    'x.y': {
      a: 32
    }
  }

  it('not an object', () => {
    const defaults = 'oops'

    const result = () => unflatten(obj, {
      defaults
    })

    expect(result).toThrow()
  })
  it('an empty object', () => {
    const defaults = {}

    const result = () => unflatten(obj, {
      defaults
    })

    expect(result).not.toThrow()
  })
  it('object w unknown keys ignored', () => {
    const defaults = {
      x: 32
    }

    const result = () => unflatten(obj, {
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

    const result = () => unflatten(obj, {
      defaults
    })

    expect(result).not.toThrow()
  })
})
