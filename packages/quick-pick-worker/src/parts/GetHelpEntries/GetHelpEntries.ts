import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getHelpEntries = (providerId: string): readonly unknown[] => {
  switch (providerId) {
    case QuickPickPrefix.Command:
      return [
        {
          category: 'global commands',
          description: ViewletQuickPickStrings.showAndRunCommands(),
        },
      ]
    case QuickPickPrefix.None:
      return [
        {
          category: 'global commands',
          description: ViewletQuickPickStrings.goToFile(),
        },
      ]
    default:
      return []
  }
}
