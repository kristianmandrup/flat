const { Logger } = require('../util')

class FlatKey extends Logger {
  constructor(opts = {}) {
    super(opts.logging)
    this.delimiter = opts.delimiter || '.'
  }

  config(key, prev) {
    this.key = key
    this.prev = prev
    return this
  }

  // TODO: extract as class
  get name() { 
    return this.prev ? this.flatKey : this.key 
  }

  get flatKey() {
    return [this.prev, this.key].join(this.delimiter || '.')    
  }  
}

module.exports = (opts) => {
  let flatKey = new FlatKey(opts)

  return (key, prev) => {    
    let flatKeyName = flatKey.config(key, prev).name
    return flatKeyName
  } 
}
