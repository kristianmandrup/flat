const {
  leafContainerFor,
  leafContainer
} = require('..')

function logMsg({
  msg = '',
  send = console.log
}) {
  send(msg)
}

function logData({
  msg = '',
  data,
  send = console.log
}) {
  send(msg, JSON.stringify(data, null, 2))
}

function log(opts) {
  opts.data ? logData(opts) : logMsg(opts)
}

function error(msg, data) {
  log({
    msg,
    data,
    send: console.erorr
  })
  throw new Error(msg)
}

describe('leafContainerFor', () => {
  const createObj = () => {
    return {
      nested: {
        title: 'the sky is blue',
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
    const result = () => {
      log({
        msg: 'do it'
      })
      leafContainerFor({
        target: obj,
        key: 'nested',
        createValue,
        recurse: leafContainer,
        error,
        log
      })
    }

    result()

    log({
      msg: 'result: leafContainerFor',
      data: obj
    })

    expect(obj.header.$stylesheet).toBeTruthy()
    expect(obj.title.$stylesheet).toBeFalse()
    expect(obj.nested.$stylesheet).toBeFalse()
  })
})
