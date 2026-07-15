import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickEntryUri from '../QuickPickEntryUri/QuickPickEntryUri.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

export const getDefaultValue = (id: number, uri = ''): string => {
  if (uri === QuickPickEntryUri.WorkspaceSymbol) {
    return QuickPickPrefix.WorkspaceSymbol
  }
  switch (id) {
    case QuickPickEntryId.EveryThing:
      return QuickPickPrefix.Command
    default:
      return ''
  }
}
