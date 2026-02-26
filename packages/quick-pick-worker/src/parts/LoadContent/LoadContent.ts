import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as GetDefaultValue from '../GetDefaultValue/GetDefaultValue.ts'
import * as GetFilterValue from '../GetFilterValue/GetFilterValue.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPicks from '../GetPicks/GetPicks.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'
import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as GetQuickPickProviderId from '../GetQuickPickProviderId/GetQuickPickProviderId.ts'
import * as GetQuickPickSubProviderId from '../GetQuickPickSubProviderId/GetQuickPickSubProviderId.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickOpenState from '../QuickPickOpenState/QuickPickOpenState.ts'

interface ParsedArgs {
  readonly ignoreFocusOut: boolean
  readonly initialValue: string
}

const parseArgs = (subId: number, args: readonly unknown[]): ParsedArgs => {
  if (subId !== QuickPickEntryId.Custom) {
    return {
      ignoreFocusOut: false,
      initialValue: '',
    }
  }
  const last = args.at(-1)
  if (!last || typeof last !== 'object') {
    return {
      ignoreFocusOut: false,
      initialValue: '',
    }
  }
  return {
    // @ts-ignore
    ignoreFocusOut: Boolean(last.ignoreFocusOut),
    // @ts-ignore
    initialValue: String(last.initialValue),
  }
}

export const loadContent = async (state: QuickPickState): Promise<QuickPickState> => {
  const { args, assetDir, fileIconCache, height, itemHeight, maxVisibleItems, platform, uri } = state
  const id = GetQuickPickProviderId.getQuickPickProviderId(uri)
  const value = GetDefaultValue.getDefaultValue(id)
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)
  const subId = GetQuickPickSubProviderId.getQuickPickSubProviderId(id, prefix)
  const newPicks = await GetPicks.getPicks(subId, value, args, { assetDir, platform })
  Assert.array(newPicks)
  const filterValue = GetFilterValue.getFilterValue(id, subId, value)
  const items = FilterQuickPickItems.filterQuickPickItems(newPicks, filterValue)
  const minLineY = 0
  const maxLineY = Math.min(minLineY + maxVisibleItems, newPicks.length)
  const sliced = newPicks.slice(minLineY, maxLineY)
  const { icons, newFileIconCache } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)
  const listHeight = GetListHeight.getListHeight(items.length, itemHeight, height)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(listHeight, itemHeight, items.length)
  const parsedArgs = parseArgs(subId, args)
  const finalValue = parsedArgs.initialValue || value
  return {
    ...state,
    args,
    cursorOffset: value.length,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    focused: true,
    focusedIndex: 0,
    icons,
    inputSource: InputSource.Script,
    items,
    maxLineY,
    minLineY,
    picks: newPicks,
    placeholder: '',
    providerId: id,
    state: QuickPickOpenState.Finished,
    value: finalValue,
  }
}
