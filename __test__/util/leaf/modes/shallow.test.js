const {
  leaf
} = require('..')

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

    expect(unflatObj).toEqual({
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

    expect(unflattened1.hello.world).toEqual({
      foo: 'bar'
    })

    expect(unflattened1.hello.world).toBe(unflattened2.hello.world)
  })

  it('Identity', () => {
    const object = {
      foo: {
        "ir.re.le.vant": 'baz'
      }
    }
    const path = ['foo']

    const x1 = leaf({}, path, object, {
      shallow: true
    })

    const x2 = leaf({}, path, object, {
      shallow: true
    })


    expect(x1).toBe(x2)
  })
})
