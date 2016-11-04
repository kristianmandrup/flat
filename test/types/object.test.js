const assert = require('assert')
const { flatten, unflatten } = require('../../index')
const flat = flatten

suite('.object', function() {
  test('Should create object instead of array when true', function() {
    var unflattened = unflatten({
      'hello.you.0': 'ipsum',
      'hello.you.1': 'lorem',
      'hello.other.world': 'foo'
    }, {
      object: true
    });
    assert.deepEqual({
      hello: {
        you: {
          0: 'ipsum',
          1: 'lorem',
        },
        other: { world: 'foo' }
      }
    }, unflattened);
    assert(!Array.isArray(unflattened.hello.you));
  })

  test('Should create object instead of array when nested', function() {
    var unflattened = unflatten({
      'hello': {
        'you.0': 'ipsum',
        'you.1': 'lorem',
        'other.world': 'foo'
      }
    }, {
      object: true
    });
    assert.deepEqual({
      hello: {
        you: {
          0: 'ipsum',
          1: 'lorem',
        },
        other: { world: 'foo' }
      }
    }, unflattened);
    assert(!Array.isArray(unflattened.hello.you));
  })

  test('Should not create object when false', function() {
    var unflattened = unflatten({
      'hello.you.0': 'ipsum',
      'hello.you.1': 'lorem',
      'hello.other.world': 'foo'
    }, {
      object: false
    });
    assert.deepEqual({
      hello: {
        you: ['ipsum', 'lorem'],
        other: { world: 'foo' }
      }
    }, unflattened);
    assert(Array.isArray(unflattened.hello.you));
  })

})

