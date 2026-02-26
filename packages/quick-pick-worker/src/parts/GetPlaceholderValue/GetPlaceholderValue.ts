import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getPlaceholderValue = (providerId: number): string => {
  switch (providerId) {
    case QuickPickEntryId.ColorTheme:
      return QuickPickStrings.selectColorTheme()
    case QuickPickEntryId.Commands:
      return QuickPickStrings.typeNameofCommandToRun()
    case QuickPickEntryId.Recent:
      return QuickPickStrings.selectToOpen()
    case QuickPickEntryId.View:
      return QuickPickStrings.typeNameofCommandToRun()
    default:
      return ''
  }
}
