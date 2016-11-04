var assert = require('assert')
  , flat = require('../../../index')
  , flatten = flat.flatten
  , unflatten = flat.unflatten

suite('.shallow', function() {
  test('Should leave nested objects untouched', function() {
    assert.deepEqual(unflatten({
      'hello.world': { 'foo.fiz': 'bar' }
    }, { shallow: true }), {
      'hello': {
        'world': {
          'foo.fiz': 'bar'
        }
      }
    })
  });

  test('Should preserve object identity', function() {
    var object = {
      'hello.world': { foo: 'bar' }
    }

    var unflattened1 = unflatten(object, { shallow: true })
    var unflattened2 = unflatten(object, { shallow: true })

    assert.deepEqual(unflattened1.hello.world, { foo: 'bar' })
    assert.strictEqual(unflattened1.hello.world, unflattened2.hello.world)
  })

  test('Identity', function() {
    var object = { foo: { "ir.re.le.vant": 'baz' } }

    assert.strictEqual(
      unflatten(object, { shallow: true }),
      unflatten(object, { shallow: true })
    )
  });

  test('Isomorphism 1', function() {
    var object = { foo: { "ir.re.le.vant": 'baz' } }

    assert.strictEqual(
      object,
      flatten(unflatten(object, { shallow: true }), { maxDepth: 1 })
    )
  });

  test('Isomorphism 2', function() {
    var object = { foo: { "ir.re.le.vant": 'baz' } }

    assert.strictEqual(
      object,
      unflatten(flatten(object, { maxDepth: 1 }), { shallow: true })
    )
  });

})