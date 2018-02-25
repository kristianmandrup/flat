const {
  leafContainerFor
} = require('..')

function log(msg, obj) {
  console.log(msg, JSON.stringify(obj, null, 2))
}
describe('leafContainerFor', () => {
  const createObj = () => {
    return {
      header: {
        color: 'green'
      },
      title: 'the sky is blue',
      nested: {
        hello: {
          abra: 'black'
        }
      }
    }
  }

  const createValue = (obj) => {
    obj.$stylesheet = true
    return obj
  }

  let obj
  beforeEach(() => {
    obj = createObj()
  })

  it('add stylesheet for header but not for title or nested', () => {
    const result = () => leafContainerFor({
      target: obj,
      createValue
    })

    result()

    log('leafContainerFor', obj)

    expect(obj.header.$stylesheet).toBeTruthy()
    expect(obj.title.$stylesheet).toBeFalse()
    expect(obj.nested.$stylesheet).toBeFalse()
  })
})
