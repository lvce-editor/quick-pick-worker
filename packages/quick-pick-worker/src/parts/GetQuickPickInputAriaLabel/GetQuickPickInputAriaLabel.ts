import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as GetQuickPickSubProviderId from '../GetQuickPickSubProviderId/GetQuickPickSubProviderId.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getQuickPickInputAriaLabel = (providerId: number, value: string, placeholder: string): string => {
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)
  const subProviderId = GetQuickPickSubProviderId.getQuickPickSubProviderId(providerId, prefix)
  switch (subProviderId) {
    case QuickPickEntryId.ColorTheme:
      return QuickPickStrings.selectColorTheme()
    case QuickPickEntryId.Commands:
      return QuickPickStrings.typeNameofCommandToRun()
    case QuickPickEntryId.Custom:
      return placeholder || QuickPickStrings.quickOpen()
    case QuickPickEntryId.File:
      return QuickPickStrings.goToFile()
    case QuickPickEntryId.GoToColumn:
    case QuickPickEntryId.GoToLine:
      return QuickPickStrings.goToLineColumn()
    case QuickPickEntryId.LanguageMode:
      return QuickPickStrings.selectLanguageMode()
    case QuickPickEntryId.Recent:
      return QuickPickStrings.selectToOpen()
    case QuickPickEntryId.Symbol:
      return QuickPickStrings.goToSymbolInEditor()
    case QuickPickEntryId.View:
      return QuickPickStrings.openView()
    case QuickPickEntryId.WorkspaceSymbol:
      return QuickPickStrings.goToSymbolInWorkspace()
    default:
      return QuickPickStrings.quickOpen()
  }
}
