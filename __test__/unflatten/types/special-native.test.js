const {
  unflatten
} = require('../../flat')


if (typeof Buffer !== 'undefined') it('Buffer', () => {
  const result = unflatten({
    'hello.empty.nested': new Buffer('test')
  })
  expect(result).toEquak({
    hello: {
      empty: {
        nested: new Buffer('test')
      }
    }
  })
})
