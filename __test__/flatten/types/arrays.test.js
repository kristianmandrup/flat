const {
  flatten
} = require('../../flat')
const flat = flatten

describe('Arrays', () => {
  it('Should be able to flatten arrays properly', () => {
    const result = flatten({
      a: ['foo', 'bar']
    })
    expect(result).toEqual({
      'a.0': 'foo',
      'a.1': 'bar'
    })
  })
})
