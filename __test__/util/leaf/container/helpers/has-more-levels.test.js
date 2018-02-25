const {
  hasMoreLevels,
} = require('..')

describe('hasMoreLevels', () => {
  it('is false for an Array', () => {
    value = ['hello']
    expect(hasMoreLevels(value)).toBeTruthy()
  })

  it('is false for a String', () => {
    value = 'hello'
    expect(hasMoreLevels(value)).toBeTruthy()
  })

  it('is true for an object containing more nested object entries', () => {
    value = {
      hello: 'hi',
      nested: {
        oops: 2
      }
    }
    expect(hasMoreLevels(value)).toBeFalsy()
  })

  it('is false for an empty object', () => {
    value = {}
    expect(hasMoreLevels(value)).toBeFalsy()
  })

  it('is false for an object only with leaf entries', () => {
    value = {
      x: 32,
      b: 'hello'
    }
    expect(hasMoreLevels(value)).toBeTruthy()
  })
})
