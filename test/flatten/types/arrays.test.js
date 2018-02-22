const assert = require('assert')
const {
  flatten
} = require('../../flat')
const flat = flatten

suite('Arrays', function () {
  test('Should be able to flatten arrays properly', function () {
    assert.deepEqual({
      'a.0': 'foo',
      'a.1': 'bar'
    }, flatten({
      a: ['foo', 'bar']
    }))
  })
})
