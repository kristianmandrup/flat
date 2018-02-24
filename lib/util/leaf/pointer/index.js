const {
  $defaults
} = require('../defaults')

const {
  options
} = require('./options')

function makePointer(opts = {}) {
  const defaults = opts.defaults || $defaults
  const option = createOptionMaker(opts, defaults)

  const $opts = options([
    'isEmptyTarget',
    'createPointer',
    'createResult'
  ])

  $opts.populatesEmptyTarget = force.bool($opts.isEmptyTarget)
  const call = createCaller($opts)

  // start depth
  const depth = $opts.startDepth || 0

  log('traverse path', {
    acc,
    path,
    depth
  })

  // accumulator used for reduce, including options to pass on for each iteration
  $opts.$acc = {
    acc,
    opts: $opts
  }

  $opts.result = call('createResult')
  $opts.pointer = call('createPointer')

  // used for notification etc.
  call('onPointer')

  return $opts.pointer
}

module.exports = {
  makePointer
}
