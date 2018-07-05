function ProviderCollaspe(language) {
  let items = []
  let { keywords,
    operators,
    builtinFunctions,
    builtinVariables,
    pseudoColumns
  } = language

  keywords.map(e => {
    items.push({
      label: e,
      detail: 'keywords: ' + e,
      kind: 13
    })
  })

  operators.map(e => {
    items.push({
      label: e,
      kind: 13,
      detail: 'operator: ' + e
    })
  })

  builtinFunctions.map(e => {
    items.push({
      label: e,
      kind: 2,
      detail: 'builtin function: ' + e
    })
  })

  builtinVariables.map(e => {
    items.push({
      label: e,
      kind: 5,
      detail: 'bulitin varible ' + e
    })
  })

  pseudoColumns.map(e => {
    items.push({
      label: e,
      kind: 17,
      detail: 'pseudo columns ' + e
    })
  })

  return items
}


export default function (monaco, IElanguagePoint) {
  const {info, conf, language} = IElanguagePoint;
  const map = ProviderCollaspe(language)
  const Promise = monaco.Promise;

  monaco.languages.register(info)
  monaco.languages.onLanguage(info.id, () => {
    monaco.languages.setMonarchTokensProvider(info.id, language)
    monaco.languages.setLanguageConfiguration(info.id, conf)
    monaco.languages.registerCompletionItemProvider(info.id, {
      provideCompletionItems (model, position, token, d) {
        console.log(model, position, token, d)

        return map
      }
    })
  })

  return map
}