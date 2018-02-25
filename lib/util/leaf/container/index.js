const {
  check
} = require('../../type-checks')

const all = require('..')

function hasMoreLevels(obj) {
  return Object.keys(obj).find(key => {
    const value = obj[key]
    return !isLeaf(value)
  })
}

function isLeafObject(value) {
  return !isLeaf(value) && !hasMoreLevels(value)
}

function isLeaf(value) {
  return !check.object(value)
}


const defaults = {
  getKeys(obj) {
    return Object.keys(obj)
  },
  createValue(value) {
    return value
  }
}

function leafContainer({
  target,
  createValue,
  getKeys
}) {
  if (!check.object(target)) {
    throw new Error(`leafContainer: Invalid target: ${target}`)
  }

  getKeys = getKeys || defaults.getKeys
  const keys = getKeys(target)
  return keys.reduce((acc, key, index) => {
    const value = target[key]
    acc[key] = isLeaf(value) ? value : leafContainerFor({
      target: acc,
      key,
      createValue,
      getKeys
    })
    return acc
  }, {})
}

function leafContainerFor({
  target,
  key,
  createValue,
  getKeys
}) {
  if (!check.object(target)) {
    throw new Error(`leafContainerFor: Invalid target: ${target} ${key}`)
  }

  getKeys = getKeys || defaults.getKeys
  const obj = target[key]
  if (!check.object(obj)) {
    target[key] = obj
    return target
  }

  const keys = getKeys(obj)

  const container = keys.reduce((acc, key, index) => {
    const value = obj[key]

    // recursive
    acc[key] = isLeaf(value) ? value : leafContainer({
      value,
      createValue,
      getKeys
    })
    return acc
  }, {})
  target[key] = createValue(container)

  return target
}

module.exports = {
  leafContainer,
  leafContainerFor
}
