function createPointer(ref, key, opts) {
  return {
    ref,
    key,
    depth: opts.depth,
    value: ref[key],
    setValue(value) {
      ref[key] = value
    }
  }
}

module.exports = {
  createPointer
}
