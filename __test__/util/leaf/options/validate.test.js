const {
  leaf
} = require('..')

describe('option: validate', () => {
  const obj = {
    x: 18
  }
  const path = ['x', 'y']
  const value = 'hello'

  describe('validateOn: true', () => {
    it('no other options', () => {
      const validateOn = 'oops'
      const result = () => leaf(obj, path, value, {
        validateOn
      })

      expect(result).toThrow()
    })

    describe('validate.keyName', () => {
      it('validates invalid key name returned', () => {
        const validateOn = false
        const result = () => leaf(obj, path, value, {
          validateOn,
          keyName: () => 42
        })

        expect(result).toThrow()
      })
    })

    describe('validate.functions', () => {

      it('option makePointer - validates not a function', () => {
        const validateOn = false
        const result = () => leaf(obj, path, value, {
          validateOn,
          makePointer: {}
        })

        expect(result).toThrow()
      })

    })
  })

  describe('validateOn: false', () => {

    it('option makePointer - not a function but not validated', () => {
      const validateOn = false
      const result = () => leaf(obj, path, value, {
        validateOn,
        makePointer: {}
      })

      expect(result).toThrow()
    })
  })
})
