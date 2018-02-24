function depth(opts = {}) {
  const {
    validate,
    depth,
    nextDepth,
    log
  } = opts
  const depth = nextDepth(depth, opts)
  validate(depth, 'depth')
  log('depth', depth)
  return depth
}

module.exports = {
  depth
}
