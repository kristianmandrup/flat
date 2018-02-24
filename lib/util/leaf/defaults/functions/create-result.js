function createResult({
  path,
  pathItem,
  acc
}) {
  return path.reduce(pathItem, acc)
}

module.exports = {
  createResult
}
