import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as FocusPick from '../FocusPick/FocusPick.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'

export const focusIndex = async (state: QuickPickState, index: number): Promise<QuickPickState> => {
  const { fileIconCache, items, maxLineY, maxVisibleItems, minLineY, providerId } = state
  await FocusPick.focusPick(providerId, items[index])

  if (index < minLineY + 1) {
    const minLineY = index
    const maxLineY = Math.min(index + maxVisibleItems, items.length - 1)
    const sliced = items.slice(minLineY, maxLineY)
    const { icons, newFileIconCache } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)

    // TODO need to scroll up
    return {
      ...state,
      fileIconCache: newFileIconCache,
      focusedIndex: index,
      icons,
      maxLineY,
      minLineY,
    }
  }
  if (index >= maxLineY - 1) {
    // TODO need to scroll down
    const maxLineY = index + 1
    const minLineY = Math.max(maxLineY - maxVisibleItems, 0)
    const sliced = items.slice(minLineY, maxLineY)
    const { icons, newFileIconCache } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)

    return {
      ...state,
      fileIconCache: newFileIconCache,
      focusedIndex: index,
      icons,
      maxLineY,
      minLineY,
    }
  }

  const sliced = items.slice(minLineY, maxLineY)
  const { icons, newFileIconCache } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)

  return {
    ...state,
    fileIconCache: newFileIconCache,
    focusedIndex: index,
    icons,
  }
}
