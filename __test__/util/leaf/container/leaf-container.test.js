const {
  leafContainer
} = require('..')

function log(msg, obj) {
  console.log(msg, JSON.stringify(obj, null, 2))
}

describe('leafContainer', () => {
  const createObj = () => {
    return {
      hello: 42,
      'top': {
        color: 'red'
      },
      card: {
        header: {
          color: 'green'
        },
        color: 'white'
      }
    }
  }

  const createValue = (obj) => {
    console.log('createValue', obj)
    obj.$stylesheet = true
    return obj
  }

  let obj
  beforeEach(() => {
    obj = createObj()
  })

  it('add stylesheet for top and header but not for card', () => {
    const result = () => leafContainer({
      target: obj,
      createValue
    })
    result()

    log('leafContainer', obj)

    expect(obj.top.$stylesheet).toBeTrue()
    expect(obj.header.$stylesheet).toBeTrue()
    expect(obj.card.$stylesheet).toBeFalse()
  })
})
