const assert = require('assert')
const {
  unflatten
} = require('../../flat')

suite('.shallow', function () {
  test('Should leave nested objects untouched', function () {
    let unflatObj = unflatten({
      'hello.world': {
        'foo.fiz': 'bar'
      }
    }, {
      shallow: true
    })

    assert.deepEqual(unflatObj, {
      'hello': {
        'world': {
          'foo.fiz': 'bar'
        }
      }
    })
  });

  test('Should preserve object identity', function () {
    var object = {
      'hello.world': {
        foo: 'bar'
      }
    }

    var unflattened1 = unflatten(object, {
      shallow: true
    })
    var unflattened2 = unflatten(object, {
      shallow: true
    })

    assert.deepEqual(unflattened1.hello.world, {
      foo: 'bar'
    })
    assert.strictEqual(unflattened1.hello.world, unflattened2.hello.world)
  })

  test('Identity', function () {
    var object = {
      foo: {
        "ir.re.le.vant": 'baz'
      }
    }

    assert.strictEqual(
      unflatten(object, {
        shallow: true
      }),
      unflatten(object, {
        shallow: true
      })
    )
  });

  test('Isomorphism 1', function () {
    var object = {
      foo: {
        "ir.re.le.vant": 'baz'
      }
    }

    assert.strictEqual(
      object,
      flatten(unflatten(object, {
        shallow: true
      }), {
        maxDepth: 1
      })
    )
  });
});
