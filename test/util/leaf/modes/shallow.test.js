const assert = require('assert')
const {
  leaf
} = require('../leaf')

suite('.shallow', function () {
  test('Should leave nested objects untouched', function () {
    const path = ['x']
    let unflatObj = leaf({}, path, {
      'x': {
        'foo.fiz': 'bar'
      }
    }, {
      shallow: true
    })

    assert.deepEqual(unflatObj, {
      'x': {
        'foo.fiz': 'bar'
      }
    })
  })

  test('Should preserve object identity', function () {
    const object = {
      hello: {
        world: {
          foo: 'bar'
        }
      }
    }
    const path = ['hello', 'world']

    const unflattened1 = leaf({}, path, object, {
      shallow: true
    })
    const unflattened2 = leaf({}, path, object, {
      shallow: true
    })

    assert.deepEqual(unflattened1.hello.world, {
      foo: 'bar'
    })
    assert.strictEqual(unflattened1.hello.world, unflattened2.hello.world)
  })

  test('Identity', function () {
    const object = {
      foo: {
        "ir.re.le.vant": 'baz'
      }
    }
    const path = ['foo']

    assert.strictEqual(
      leaf({}, path, object, {
        shallow: true
      }),
      leaf({}, path, object, {
        shallow: true
      })
    )
  })
})
