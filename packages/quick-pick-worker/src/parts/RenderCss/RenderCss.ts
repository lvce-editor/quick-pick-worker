import { ViewletCommand } from '@lvce-editor/constants'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as GetCss from '../GetCss/GetCss.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetScrollBarSize from '../GetScrollBarSize/GetScrollBarSize.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

const getQuickPickItemsHeight = (height: number): number => {
  if (height === 0) {
    return 20
  }
  return height
}

export const renderCss = (_oldState: QuickPickState, newState: QuickPickState): readonly unknown[] => {
  const { deltaY, finalDeltaY, headerHeight, height, itemHeight, items, minimumSliderSize, uid } = newState
  const quickPickItemsHeight = getQuickPickItemsHeight(height)
  const listHeight = GetListHeight.getListHeight(items.length, itemHeight, quickPickItemsHeight)
  const contentHeight = items.length * itemHeight
  const scrollBarHeight = GetScrollBarSize.getScrollBarSize(listHeight, contentHeight, minimumSliderSize)
  const scrollBarTop = Math.round(ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, quickPickItemsHeight - headerHeight, scrollBarHeight))
  const css = GetCss.getCss(scrollBarHeight, scrollBarTop, quickPickItemsHeight)
  return [ViewletCommand.SetCss, uid, css]
}