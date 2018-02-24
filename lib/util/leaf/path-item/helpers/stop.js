function stopWith(opts) {
  const {
    stopCondition,
    whenStopped,
    acc,
  } = opts
  if (stopCondition(opts)) {
    return whenStopped(opts) || acc
  }
}

module.exports = {
  stopWith
}
