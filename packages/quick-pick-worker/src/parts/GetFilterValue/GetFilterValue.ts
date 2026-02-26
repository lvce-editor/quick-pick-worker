import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'

interface Fn {
  (value: string): string
}

const noop = (value: string): string => {
  return value
}

const getFilterValueEverything = (value: string): string => {
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)
  const prefixLength = prefix.length
  return value.slice(prefixLength).trim()
}

const getValueGoToColumn = (value: string): string => {
  return ''
}

const getValueGoToLine = (value: string): string => {
  return ''
}

const getFn = (id: number): Fn => {
  switch (id) {
    case QuickPickEntryId.EveryThing:
      return getFilterValueEverything
    case QuickPickEntryId.GoToColumn:
      return getValueGoToColumn
    case QuickPickEntryId.GoToLine:
      return getValueGoToLine

    default:
      return noop
  }
}

export const getFilterValue = (id: number, subId: number, value: string): string => {
  if (subId === QuickPickEntryId.GoToColumn) {
    return getValueGoToColumn(value)
  }
  if (subId === QuickPickEntryId.GoToLine) {
    return getValueGoToLine(value)
  }
  const fn = getFn(id)
  const filterValue = fn(value)
  return filterValue
}
