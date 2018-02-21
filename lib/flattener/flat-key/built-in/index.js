const toSnakeCase = require('./snake-case')
const camelCase = require('./camel-case')

const snakeCase = (left, right) => toSnakeCase(camelCase(left, right))

const builtIn = {
  camelCase,
  snakeCase
}

module.exports = {
  builtIn
}
