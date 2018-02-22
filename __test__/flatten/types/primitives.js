const {
  flatten,
  unflatten
} = require('../../flat')
const flat = flatten

const primitives = {
  String: 'good morning',
  Number: 1234.99,
  Boolean: true,
  Date: new Date,
  null: null,
  undefined: undefined
}

describe('Flatten Primitives', () => {
  Object.keys(primitives).forEach(function (key) {
    const value = primitives[key]

    it(key, () => {
      const result = flatten({
        hello: {
          world: value
        }
      })
      expect(result).toEqual({
        'hello.world': value
      })
    })
  })
})
