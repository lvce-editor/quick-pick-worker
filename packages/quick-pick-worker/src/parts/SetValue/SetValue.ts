import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as GetFilterValue from '../GetFilterValue/GetFilterValue.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPicks from '../GetPicks/GetPicks.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'
import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as GetQuickPickSubProviderId from '../GetQuickPickSubProviderId/GetQuickPickSubProviderId.ts'
import * as InputSource from '../InputSource/InputSource.ts'

// TODO when user types letters -> no need to query provider again -> just filter existing results
export const setValue = async (state: QuickPickState, newValue: string): Promise<QuickPickState> => {
  const { args, assetDir, fileIconCache, height, itemHeight, maxLineY, minLineY, platform, providerId, value } = state
  if (value === newValue) {
    return state
  }
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(newValue)
  const subId = GetQuickPickSubProviderId.getQuickPickSubProviderId(providerId, prefix)
  const newPicks = await GetPicks.getPicks(subId, newValue, args, { assetDir, platform })
  const filterValue = GetFilterValue.getFilterValue(providerId, subId, newValue)
  const items = FilterQuickPickItems.filterQuickPickItems(newPicks, filterValue)
  const focusedIndex = items.length === 0 ? -1 : 0
  const sliced = items.slice(minLineY, maxLineY)
  const { icons, newFileIconCache } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)

  const listHeight = GetListHeight.getListHeight(items.length, itemHeight, height)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(listHeight, itemHeight, items.length)

  return {
    ...state,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    focusedIndex,
    icons,
    inputSource: InputSource.Script,
    items,
    picks: newPicks,
    value: newValue,
  }
}
