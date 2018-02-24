const {
  pathItemHelpers
} = require('..')

const {
  depth
} = pathItemHelpers

describe('pathItem', () => {
  describe('helper: depth', () => {
    const acc = {}
    const nextDepth = () => 32

    const validate = () => true
    const log = () => undefined

    beforeEach(() => {
      obj = createObj()
    })

    it('not a number', () => {
      const opts = {
        acc,
        nextDepth,
        validate,
        log
      }

      const result = () => depth(opts)

      expect(result).toThrow()
    })
  })
})
