import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetProtoVisibleQuickPickItems from '../GetProtoVisibleQuickPickItems/GetProtoVisibleQuickPickItems.ts'
import * as GetScrollBarSize from '../GetScrollBarSize/GetScrollBarSize.ts'
import * as GetVisibleQuickPickItems from '../GetVisibleQuickPickItems/GetVisibleQuickPickItems.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const createQuickPickViewModel = (oldState: QuickPickState, newState: QuickPickState): QuickPickViewModel => {
  const {
    cursorOffset,
    deltaY,
    finalDeltaY,
    focused,
    focusedIndex,
    headerHeight,
    height,
    icons,
    itemHeight,
    items,
    maxLineY,
    minimumSliderSize,
    minLineY,
    uid,
    value,
  } = newState
  const protoVisibleItems = GetProtoVisibleQuickPickItems.getVisible(items, minLineY, maxLineY, icons)
  const visibleItems = GetVisibleQuickPickItems.getVisible(items.length, protoVisibleItems, minLineY, focusedIndex)
  const oldFocusedIndex = oldState.focusedIndex - oldState.minLineY
  const newFocusedIndex = focusedIndex - minLineY
  const itemCount = items.length
  const listHeight = GetListHeight.getListHeight(itemCount, itemHeight, height)
  const contentHeight = itemCount * itemHeight
  const scrollBarHeight = GetScrollBarSize.getScrollBarSize(listHeight, contentHeight, minimumSliderSize)
  const scrollBarY = ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, height - headerHeight, scrollBarHeight)
  const roundedScrollBarY = Math.round(scrollBarY)
  return {
    cursorOffset,
    focused,
    height,
    newFocusedIndex,
    oldFocusedIndex,
    scrollBarHeight,
    scrollBarTop: roundedScrollBarY,
    uid,
    value,
    visibleItems,
  }
}
