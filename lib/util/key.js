// safely ensure that the key is
// an integer.
function safeNumberKey(key) {
  const parsedKey = Number(key)
  return (
      isNaN(parsedKey) ||
      key.indexOf('.') !== -1
    ) ? key :
    parsedKey
}

module.exports = {
  safeNumberKey
}
