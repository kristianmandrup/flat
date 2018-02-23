const {
  unflatten
} = require('../../flat')

describe('.shallow', () => {
  it('Should leave nested objects untouched', () => {
    let unflatObj = unflatten({
      'hello.world': {
        'foo.fiz': 'bar'
      }
    }, {
      shallow: true
    })

    expect(unflatObj).toEqual({
      'hello': {
        'world': {
          'foo.fiz': 'bar'
        }
      }
    })
  });

  it('Should preserve object identity', () => {
    const object = {
      'hello.world': {
        foo: 'bar'
      }
    }

    const unflattened1 = unflatten(object, {
      shallow: true
    })
    const unflattened2 = unflatten(object, {
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

    expect(
      unflatten(object, {
        shallow: true
      })).toBe(
      unflatten(object, {
        shallow: true
      })
    )
  });

  it('Isomorphism 1', () => {
    const object = {
      foo: {
        "ir.re.le.vant": 'baz'
      }
    }

    expect(
      flatten(unflatten(object, {
        shallow: true
      }), {
        maxDepth: 1
      })
    ).toEqual(object)
  });
});
