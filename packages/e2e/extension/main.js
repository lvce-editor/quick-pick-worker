import { activate, registerFormattingProvider } from '@lvce-editor/api'

await activate()

registerFormattingProvider({
  id: 'quick-pick-formatting',
  languageId: 'quick-pick-formatting',
  format(textDocument) {
    const formatted = textDocument.text.replace('value=', 'value = ')
    if (formatted === textDocument.text) {
      return []
    }
    return [
      {
        endOffset: textDocument.text.length,
        inserted: formatted,
        startOffset: 0,
      },
    ]
  },
})
