const {
  pathItemHelpers
} = require('..')

const {
  acc
} = pathItemHelpers

describe('pathItem', () => {
  describe('helper: acc', () => {
    const acc = {}
    const nextAcc = () => {
      x: 32
    }

    const validate = () => true
    const log = () => undefined

    beforeEach(() => {
      obj = createObj()
    })

    it('not a number', () => {
      const opts = {
        acc,
        nextAcc,
        validate,
        log
      }

      const result = () => acc(opts)

      expect(result).toThrow()
    })
  })
})
