import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

export const getDefaultValue = (id: number): string => {
  switch (id) {
    case QuickPickEntryId.EveryThing:
      return QuickPickPrefix.Command
    default:
      return ''
  }
}
