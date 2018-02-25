const {
  hasOnlyLeaves,
} = require('..')

describe('hasOnlyLeaves', () => {
  it('is false for an Array', () => {
    value = ['hello']
    expect(hasOnlyLeaves(value)).toBeTruthy()
  })

  it('is false for a String', () => {
    value = 'hello'
    expect(hasOnlyLeaves(value)).toBeTruthy()
  })

  it('is false for an object containing more nested object entries', () => {
    value = {
      hello: 'hi',
      nested: {
        oops: 2
      }
    }
    expect(hasOnlyLeaves(value)).toBeFalsy()
  })

  it('is false for an empty object', () => {
    value = {}
    expect(hasOnlyLeaves(value)).toBeFalsy()
  })

  it('is true for an object only with leaf entries', () => {
    value = {
      x: 32,
      b: 'hello'
    }
    expect(hasOnlyLeaves(value)).toBeTruthy()
  })
})
