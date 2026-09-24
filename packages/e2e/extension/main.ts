// This extension fixture runs in the isolated extension host, outside the test process.
// eslint-disable-next-line e2e/no-imports
import { activate, registerFormattingProvider } from '@lvce-editor/api'

await activate()

registerFormattingProvider({
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
  id: 'quick-pick-formatting',
  languageId: 'quick-pick-formatting',
})
