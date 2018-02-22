module.exports = toSnakeCase = () => {
  const upperChars = this.match(/([A-Z])/g);
  if (!upperChars) {
    return this;
  }

  const str = this.toString();
  for (const i = 0, n = upperChars.length; i < n; i++) {
    str = str.replace(new RegExp(upperChars[i]), '_' + upperChars[i].toLowerCase());
  }

  if (str.slice(0, 1) === '_') {
    str = str.slice(1);
  }

  return str;
};
