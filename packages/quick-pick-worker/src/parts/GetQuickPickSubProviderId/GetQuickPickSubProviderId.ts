import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

export const getQuickPickSubProviderId = (id: number, prefix: string): number => {
  if (id !== QuickPickEntryId.EveryThing) {
    return id
  }
  switch (prefix) {
    case QuickPickPrefix.Command:
      return QuickPickEntryId.Commands
    case QuickPickPrefix.GoToColumn:
      return QuickPickEntryId.GoToColumn
    case QuickPickPrefix.GoToLine:
      return QuickPickEntryId.GoToLine
    case QuickPickPrefix.Help:
      return QuickPickEntryId.Help
    case QuickPickPrefix.Symbol:
      return QuickPickEntryId.Symbol
    case QuickPickPrefix.View:
      return QuickPickEntryId.View
    case QuickPickPrefix.WorkspaceSymbol:
      return QuickPickEntryId.WorkspaceSymbol
    default:
      return QuickPickEntryId.File
  }
}
