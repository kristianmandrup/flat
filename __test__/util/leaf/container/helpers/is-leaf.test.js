const {
  isLeaf,
} = require('..')

describe('isLeaf', () => {
  let value

  it('is true for an Array', () => {
    value = ['hello']
    expect(isLeaf(value)).toBeTruthy()
  })

  it('is true for a String', () => {
    value = 'hello'
    expect(isLeaf(value)).toBeTruthy()
  })

  it('is false for an object', () => {
    value = {
      hello: 'hi'
    }
    expect(isLeaf(value)).toBeFalsy()
  })
})
