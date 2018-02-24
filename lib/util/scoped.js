function scoped(api, opts) {
  return Object.keys(api).reduce((acc, name) => {
    acc[name] = function (opts) {
      return function () {
        return api[name](opts)
      }
    }(opts)
    return acc
  }, {})
}

module.exports = {
  scoped
}
