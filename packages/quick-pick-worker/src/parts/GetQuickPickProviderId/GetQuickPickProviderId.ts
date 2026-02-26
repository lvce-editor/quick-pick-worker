import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickEntryUri from '../QuickPickEntryUri/QuickPickEntryUri.ts'

export const getQuickPickProviderId = (prefix: string): number => {
  switch (prefix) {
    case QuickPickEntryUri.ColorTheme:
      return QuickPickEntryId.ColorTheme
    case QuickPickEntryUri.Commands:
    case QuickPickEntryUri.EveryThing:
    case QuickPickEntryUri.GoToLine:
    case QuickPickEntryUri.Help:
    case QuickPickEntryUri.Symbol:
    case QuickPickEntryUri.View:
    case QuickPickEntryUri.WorkspaceSymbol:
      return QuickPickEntryId.EveryThing
    case QuickPickEntryUri.Custom:
      return QuickPickEntryId.Custom
    case QuickPickEntryUri.Recent:
      return QuickPickEntryId.Recent
    default:
      return QuickPickEntryId.File
  }
}
