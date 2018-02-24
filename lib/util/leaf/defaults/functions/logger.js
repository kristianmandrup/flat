function log(msg, obj) {
  const displayValue = isObject(obj) ? JSON.stringify(obj, null, 2) : obj
  displayValue ? console.log(msg, displayValue) : console.log(msg)
}

function error(msg, obj) {
  obj ? console.error(msg, obj) : console.log(msg)
  throw new Error(msg)
}

function logger(opts = {}) {
  const logOn = () => opts.logging || opts.logOn

  return {
    // controller logging
    log(msg, obj) {
      if (!logOn()) return
      log(msg, obj)
    },
    error(msg, obj) {
      error(msg, obj)
    }
  }
}

module.exports = {
  log,
  error,
  logger
}
