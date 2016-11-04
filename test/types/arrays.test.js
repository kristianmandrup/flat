var assert = require('assert')
  , flat = require('../../index')
  , flatten = flat.flatten
  , unflatten = flat.unflatten

suite('Arrays', function() {
  test('Should be able to flatten arrays properly', function() {
    assert.deepEqual({
        'a.0': 'foo'
      , 'a.1': 'bar'
    }, flatten({
      a: ['foo', 'bar']
    }))
  })

  test('Should be able to revert and reverse array serialization via unflatten', function() {
    assert.deepEqual({
      a: ['foo', 'bar']
    }, unflatten({
        'a.0': 'foo'
      , 'a.1': 'bar'
    }))
  })

  test('Array typed objects should be restored by unflatten', function () {
    assert.equal(
        Object.prototype.toString.call(['foo', 'bar'])
      , Object.prototype.toString.call(unflatten({
          'a.0': 'foo'
        , 'a.1': 'bar'
      }).a)
    )
  })

  test('Do not include keys with numbers inside them', function() {
    assert.deepEqual(unflatten({
      '1key.2_key': 'ok'
    }), {
      '1key': {
        '2_key': 'ok'
      }
    })
  })
})
