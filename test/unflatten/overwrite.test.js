const assert = require('assert')
const {
  unflatten
} = require('../flat')

suite('Overwrite + non-object values in key positions', function () {
  test('non-object keys + overwrite should be overwritten', function () {
    assert.deepEqual(unflatten({
      a: null,
      'a.b': 'c'
    }, {
      overwrite: true
    }), {
      a: {
        b: 'c'
      }
    })
    assert.deepEqual(unflatten({
      a: 0,
      'a.b': 'c'
    }, {
      overwrite: true
    }), {
      a: {
        b: 'c'
      }
    })
    assert.deepEqual(unflatten({
      a: 1,
      'a.b': 'c'
    }, {
      overwrite: true
    }), {
      a: {
        b: 'c'
      }
    })
    assert.deepEqual(unflatten({
      a: '',
      'a.b': 'c'
    }, {
      overwrite: true
    }), {
      a: {
        b: 'c'
      }
    })
  })

  test('overwrite value should not affect undefined keys', function () {
    assert.deepEqual(unflatten({
      a: undefined,
      'a.b': 'c'
    }, {
      overwrite: true
    }), {
      a: {
        b: 'c'
      }
    })
    assert.deepEqual(unflatten({
      a: undefined,
      'a.b': 'c'
    }, {
      overwrite: false
    }), {
      a: {
        b: 'c'
      }
    })
  })

  test('if no overwrite, should ignore nested values under non-object key', function () {
    assert.deepEqual(unflatten({
      a: null,
      'a.b': 'c'
    }), {
      a: null
    })
    assert.deepEqual(unflatten({
      a: 0,
      'a.b': 'c'
    }), {
      a: 0
    })
    assert.deepEqual(unflatten({
      a: 1,
      'a.b': 'c'
    }), {
      a: 1
    })
    assert.deepEqual(unflatten({
      a: '',
      'a.b': 'c'
    }), {
      a: ''
    })
  })
})
