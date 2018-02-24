function makeCall(fun, opts) {
  const {
    validate
  } = opts
  validate.types['function'](fun)
  return fun(opts)
}

function createCaller(opts) {
  return function (fun) {
    fun = typeof fun === 'string' ? opts[fun] : fun
    return makeCall(fun, opts)
  }
}

module.exports = {
  makeCall,
  createCaller
}
