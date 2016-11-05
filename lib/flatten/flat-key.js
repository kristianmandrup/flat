const { Logger } = require('../util')

class FlatKey extends Logger {
  constructor(key, opts = {}) {
    super(opts.logging)
    const { delimiter, prev} = opts
    this.log('FlatKey', delimiter, prev)
    this.key = key
    this.delimiter = delimiter || '.'
    this.prev = prev
    this.delimiter = delimiter
  }

  // TODO: extract as class
  get name() { 
    return this.prev ? this.flatKey : this.key 
  }

  get flatKey() {
    return this.prev + this.delimiter + this.key    
  }  
}

module.exports = (delimiter) => {
  return (key, opts) => {    
    let flatKey = new FlatKey(key, opts).name
    console.log('flat-key', key, opts, '=', flatKey)
    return flatKey
  } 
}
