const {
  leaf
} = require('../leaf')

describe('.shallow', () => {
  it('Should leave nested objects untouched', () => {
    const path = ['x']
    let unflatObj = leaf({}, path, {
      'x': {
        'foo.fiz': 'bar'
      }
    }, {
      shallow: true
    })

    expect(unflatObj, {
      'x': {
        'foo.fiz': 'bar'
      }
    })
  })

  it('Should preserve object identity', () => {
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

    expect(unflattened1.hello.world, {
      foo: 'bar'
    })
    assert.strictEqual(unflattened1.hello.world, unflattened2.hello.world)
  })

  it('Identity', () => {
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
