class FlatKey {
  constructor(key, opts = {}) {
    const { delimiter, prev} = opts

    this.key = key
    this.delimiter = delimiter
    this.prev = prev
    this.delimiter = delimiter
  }

  // TODO: extract as class
  get name() { 
    return !this.prev ? key : this.flatKey
  }

  flatKey() {
    return this.prev + this.delimiter + this.key    
  }  
}

module.exports = (delimiter) => {
  return (key, opts) {    
    return new FlatKey(key, opts).name
  } 
}
