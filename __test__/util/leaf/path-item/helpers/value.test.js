const {
  pathItemHelpers
} = require('..')

const {
  value
} = pathItemHelpers

describe('pathItem', () => {
  describe('helper: value', () => {
    const acc = {}
    const nextValue = () => {}

    const validate = () => true
    const log = () => undefined

    beforeEach(() => {
      obj = createObj()
    })

    it('returns valid next value to set on acc', () => {
      const opts = {
        nextValue,
        validate,
        log
      }

      const result = () => value(opts)

      expect(result).toThrow()
    })
  })
})
