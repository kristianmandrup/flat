const {
  unflatten
} = require('..')

it('Identity', () => {
  const object = {
    foo: {
      bar: 'baz'
    }
  }

  expect(unflatten(object), unflatten(object))
});
