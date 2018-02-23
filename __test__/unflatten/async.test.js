const {
  unflatten
} = require('..')

const {
  log,
  error
} = console

describe('Unflatten: async', () => {
  const obj = {
    'x.y': {
      a: 32
    },
    'a.b': {
      z: true
    }
  }

  const async = true

  it('resolves promises w result', () => {
    const result = () => unflatten(obj, {
      async
    })

    result()
      .then(result => {
        expect(typeof result).toBe('object')
      })
      .catch(err => {
        error('not expected', err)
      })
  })

  it('rejects promises w errors', () => {
    const result = () => unflatten(obj, {
      async
    })

    result().catch(err => {
      expect(err).toBeDefined()
    })
  })
})
