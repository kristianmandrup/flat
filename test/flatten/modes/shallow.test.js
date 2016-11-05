const assert = require('assert')
const { flatten, unflatten } = require('../../../index')
const flat = flatten

suite('.shallow', function() {
  test('Isomorphism 2', function() {
    var object = { foo: { "ir.re.le.vant": 'baz' } }

    assert.strictEqual(
      object,
      unflatten(flatten(object, { maxDepth: 1 }), { shallow: true })
    )
  });

})