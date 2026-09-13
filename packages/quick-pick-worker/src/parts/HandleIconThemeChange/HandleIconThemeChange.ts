import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'

export const handleIconThemeChange = async (state: QuickPickState): Promise<QuickPickState> => {
  const visibleItems = state.items.slice(state.minLineY, state.maxLineY)
  const { icons, newFileIconCache } = await GetQuickPickFileIcons.getQuickPickFileIcons(visibleItems, {})
  return {
    ...state,
    fileIconCache: newFileIconCache,
    icons,
  }
}
