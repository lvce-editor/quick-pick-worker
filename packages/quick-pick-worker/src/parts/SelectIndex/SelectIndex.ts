import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as CloseWidget from '../CloseWidget/CloseWidget.ts'
import * as GetPick from '../GetPick/GetPick.ts'
import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as GetQuickPickSubProviderId from '../GetQuickPickSubProviderId/GetQuickPickSubProviderId.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectIndex = async (state: QuickPickState, index: number, button = /* left */ 0): Promise<QuickPickState> => {
  const { items, minLineY, providerId, value } = state
  const actualIndex = index + minLineY
  const pick = GetPick.getPick(items, actualIndex)
  if (!pick) {
    return state
  }
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)
  const subId = GetQuickPickSubProviderId.getQuickPickSubProviderId(providerId, prefix)
  const fn = QuickPickEntries.getSelect(subId)
  const selectPickResult = await fn(pick, value)
  Assert.object(selectPickResult)
  Assert.string(selectPickResult.command)
  const { command } = selectPickResult
  switch (command) {
    case QuickPickReturnValue.Hide:
      await CloseWidget.closeWidget(state.uid)
      return state
    default:
      return state
  }

  // TODO recent picks should be per provider
  // if (!state.recentPickIds.has(pick.id)) {
  //   state.recentPicks.unshift(pick)
  //   state.recentPickIds.add(pick.id)
  // }
  // if (state.recentPicks.length > RECENT_PICKS_MAX_SIZE) {
  //   const last = state.recentPicks.pop()
  //   state.recentPickIds.delete(last.id)
  // }
}
