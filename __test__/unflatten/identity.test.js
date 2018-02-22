const {
  unflatten
} = require('../flat')

it('Identity', () => {
  const object = {
    foo: {
      bar: 'baz'
    }
  }

  assert.strictEqual(unflatten(object), unflatten(object))
});
