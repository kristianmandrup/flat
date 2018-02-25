const {
  isLeafObject,
  hasMoreLevels,
  hasOnlyLeaves,
} = require('..')

describe('isLeafObject', () => {
  it('is false for an Array', () => {
    value = ['hello']
    expect(isLeafObject(value)).toBeTruthy()
  })

  it('is false for a String', () => {
    value = 'hello'
    expect(isLeafObject(value)).toBeTruthy()
  })

  it('is false for an empty object', () => {
    value = {}
    expect(isLeafObject(value)).toBeFalsy()
  })

  it('is false for an object only with leaf entries', () => {
    value = {
      x: 32,
      b: 'hello'
    }
    expect(isLeafObject(value)).toBeTruthy()
  })

  it('is false for an object containing more nested object entries', () => {
    value = {
      hello: 'hi',
      nested: {
        oops: 2
      }
    }
    expect(isLeafObject(value)).toBeFalsy()
  })

})
