function selectKV({
  keyMatchers,
  keyQueryMatcher,
  selectAt,
  populatesEmptyTarget
}) {
  let selected = {}
  if (!populatesEmptyTarget) {
    const selectOpts = Object.assign(opts, {
      keyMatchers,
      keyQueryMatcher
    })

    const selectKey = () => pathKey.toString()
    const defaultValue = () => acc[selectKey]
    selected = selectAt ? selectAt(acc, pathKey, selectOpts) : {
      key: selectKey(),
      value: defaultValue()
    }

    log('selected', {
      selected
    })
  }
  return selected
}
