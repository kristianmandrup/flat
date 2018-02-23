const {
  unflatten
} = require('..')

describe('option: overwrite', () => {
  it('non-object keys + overwrite should be overwritten', () => {
    // expect(unflatten({
    //   a: null,
    //   'a.b': 'c'
    // }, {
    //   overwrite: true
    // }), {
    //   a: {
    //     b: 'c'
    //   }
    // })

    // expect(unflatten({
    //   a: 0,
    //   'a.b': 'c'
    // }, {
    //   overwrite: true
    // }), {
    //   a: {
    //     b: 'c'
    //   }
    // })
    // expect(unflatten({
    //   a: 1,
    //   'a.b': 'c'
    // }, {
    //   overwrite: true
    // }), {
    //   a: {
    //     b: 'c'
    //   }
    // })
    // expect(unflatten({
    //   a: '',
    //   'a.b': 'c'
    // }, {
    //   overwrite: true
    // }), {
    //   a: {
    //     b: 'c'
    //   }
    // })
  })

  it('overwrite value should not affect undefined keys', () => {
    // expect(unflatten({
    //   a: undefined,
    //   'a.b': 'c'
    // }, {
    //   overwrite: true
    // }), {
    //   a: {
    //     b: 'c'
    //   }
    // })
    // expect(unflatten({
    //   a: undefined,
    //   'a.b': 'c'
    // }, {
    //   overwrite: false
    // }), {
    //   a: {
    //     b: 'c'
    //   }
    // })
  })

  it('if no overwrite, should ignore nested values under non-object key', () => {
    // expect(unflatten({
    //   a: null,
    //   'a.b': 'c'
    // }), {
    //   a: null
    // })
    // expect(unflatten({
    //   a: 0,
    //   'a.b': 'c'
    // }), {
    //   a: 0
    // })
    // expect(unflatten({
    //   a: 1,
    //   'a.b': 'c'
    // }), {
    //   a: 1
    // })
    // expect(unflatten({
    //   a: '',
    //   'a.b': 'c'
    // }), {
    //   a: ''
    // })
  })
})
