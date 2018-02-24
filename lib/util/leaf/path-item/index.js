const helpers = require('./helpers')

const {
  scoped
} = require('../..')

function pathItem(
  acc,
  pathKey,
  index
) {
  const $opts = acc.opts
  const api = scoped(helpers, opts)

  log('iterate path', {
    obj: acc.obj,
    pathKey,
    index
  })

  $opts.pathKey = pathKey
  $opts.index = index

  // api already scope with opts reference!
  $opts.stoppedWith = api.stopWith()
  if ($opts.stoppedWith) return $opts.stoppedWith

  $opts.selected = api.select()
  $opts.value = api.value()
  $opts.nextAcc = api.acc()
  $opts.depth = api.depth()

  return $opts.nextAcc
}

module.exports = {
  pathItem,
  pathItemHelpers: helpers
}
