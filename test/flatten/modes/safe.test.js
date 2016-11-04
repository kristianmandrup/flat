var assert = require('assert')
  , flat = require('../../../index')
  , flatten = flat.flatten
  , unflatten = flat.unflatten

suite('.safe', function() {
  test('Should protect arrays when true', function() {
    assert.deepEqual(flatten({
      hello: [
          { world: { again: 'foo' } }
        , { lorem: 'ipsum' }
      ]
      , another: {
        nested: [{ array: { too: 'deep' }}]
      }
      , lorem: {
        ipsum: 'whoop'
      }
    }, {
      safe: true
    }), {
      hello: [
          { world: { again: 'foo' } }
        , { lorem: 'ipsum' }
      ]
      , 'lorem.ipsum': 'whoop'
      , 'another.nested': [{ array: { too: 'deep' }}]
    })
  })

  test('Should not protect arrays when false', function() {
    assert.deepEqual(flatten({
      hello: [
          { world: { again: 'foo' } }
        , { lorem: 'ipsum' }
      ]
    }, {
      safe: false
    }), {
        'hello.0.world.again': 'foo'
      , 'hello.1.lorem': 'ipsum'
    })
  })
})