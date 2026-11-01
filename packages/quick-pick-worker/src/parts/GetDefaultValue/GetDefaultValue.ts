import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickEntryUri from '../QuickPickEntryUri/QuickPickEntryUri.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

export const getDefaultValue = (id: number, uri = '', args: readonly unknown[] = []): string => {
  if (uri === QuickPickEntryUri.GoToLine) {
    const line = Number(args[1])
    const column = Number(args[2])
    if (Number.isSafeInteger(line) && Number.isSafeInteger(column) && line >= 1 && column >= 1) {
      return `${QuickPickPrefix.GoToLine}${line}:${column}`
    }
    return QuickPickPrefix.GoToLine
  }
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
