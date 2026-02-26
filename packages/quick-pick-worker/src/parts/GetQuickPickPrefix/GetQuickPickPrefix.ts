import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

export const getQuickPickPrefix = (value: string): string => {
  if (value.startsWith(QuickPickPrefix.Command)) {
    return QuickPickPrefix.Command
  }
  if (value.startsWith(QuickPickPrefix.Symbol)) {
    return QuickPickPrefix.Symbol
  }
  if (value.startsWith(QuickPickPrefix.WorkspaceSymbol)) {
    return QuickPickPrefix.WorkspaceSymbol
  }
  if (value.startsWith(QuickPickPrefix.GoToColumn)) {
    return QuickPickPrefix.GoToColumn
  }
  if (value.startsWith(QuickPickPrefix.GoToLine)) {
    return QuickPickPrefix.GoToLine
  }
  if (value.startsWith(QuickPickPrefix.View)) {
    return QuickPickPrefix.View
  }
  return QuickPickPrefix.None
}
