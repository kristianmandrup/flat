const {
  pathItemHelpers
} = require('..')

const {
  select
} = pathItemHelpers

describe('pathItem', () => {
  describe('helper: select', () => {
    const acc = {}
    const nextselect = () => 32

    const validate = () => true
    const log = () => undefined

    beforeEach(() => {
      obj = createObj()
    })

    it('not a number', () => {
      const opts = {
        nextSelect,
        validate,
        log
      }

      const result = () => select(opts)

      expect(result).toThrow()
    })
  })
})
