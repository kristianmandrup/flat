const {
  pathItemHelpers
} = require('..')

const {
  stop
} = pathItemHelpers

describe('pathItem', () => {
  describe('helper: stop', () => {
    const acc = {}
    const stopWith = () => {}

    const validate = () => true
    const log = () => undefined

    beforeEach(() => {
      obj = createObj()
    })

    it('stops with a valid acc', () => {
      const opts = {
        stopWith,
        validate,
        log
      }

      const result = () => stop(opts)

      expect(result).toThrow()
    })
  })
})
