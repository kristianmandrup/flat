// leafValue
const {
  leaf
} = require('../leaf')

const {
  log
} = console

describe('leaf: option - leafValue', () => {
  const obj = {}
  const path = ['x', 'y']
  const value = 'hello'

  it('not an object', () => {
    const leafValue = 'ss'
    const result = () => leaf(obj, path, value, {
      leafValue,
      logging: true
    })

    log('not an object', {
      obj,
      path,
      value
    })

    expect(result).not.toThrow()
  })

  describe.skip('select', () => {
    it('not a function', () => {
      const leafValue = {
        select: true
      }

      const result = () => leaf(obj, path, value, {
        leafValue,
        logOn: true
      })

      expect(result).not.toThrow()

      log('res', result())
      expect(typeof result()).toBe('object')
    })

    it('function that returns nothing - throws', () => {
      const leafValue = {
        select(opts) {}
      }

      const result = () => leaf(obj, path, value, {
        leafValue
      })

      log('nothing', result())

      expect(result).toThrow()
    })

    it('function that returns valid value function - not throw', () => {
      const leafValue = {
        select(opts) {
          return leafValue.shallow
        },
        shallow(value) {
          return value
        }
      }

      const result = () => leaf(obj, path, value, {
        leafValue
      })

      expect(result).not.toThrow()
      expect(typeof result()).toEqual('object')
    })
  })
})
