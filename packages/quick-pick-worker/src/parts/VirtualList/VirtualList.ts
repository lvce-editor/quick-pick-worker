import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetScrollBarSize from '../GetScrollBarSize/GetScrollBarSize.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const create = ({
  headerHeight = 0,
  itemHeight,
  minimumSliderSize = 20,
}: {
  readonly itemHeight: number
  readonly headerHeight?: number
  readonly minimumSliderSize?: number
}): any => {
  return {
    deltaY: 0,
    finalDeltaY: 0,
    focusedIndex: -1,
    headerHeight,
    itemHeight,
    items: [],
    maxLineY: 0,
    minimumSliderSize,
    minLineY: 0,
    scrollBarActive: false,
    scrollBarHeight: 0,
    scrollBarPointerId: -1,
    scrollBarPointerOffsetY: 0,
    touchDifference: 0,
    touchOffsetY: 0,
    touchTimeStamp: 0,
  }
}

const getListHeight = (height: number, headerHeight: number): number => {
  if (headerHeight) {
    return height - headerHeight
  }
  return headerHeight
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

const getScrollBarHeight = (state: QuickPickState): number => {
  const { height, itemHeight, items, minimumSliderSize } = state
  const listHeight = GetListHeight.getListHeight(items.length, itemHeight, height)
  const contentHeight = items.length * itemHeight
  return GetScrollBarSize.getScrollBarSize(listHeight, contentHeight, minimumSliderSize)
}

const getScrollBarTop = (state: QuickPickState, scrollBarHeight: number): number => {
  const scrollBarSize = state.height - state.headerHeight
  return ScrollBarFunctions.getScrollBarY(state.deltaY, state.finalDeltaY, scrollBarSize, scrollBarHeight)
}

const getRelativePointerY = (state: QuickPickState, clientY: number): number => {
  return clientY - state.top - state.headerHeight
}

export const setDeltaY = (state: QuickPickState, deltaY: number): QuickPickState => {
  Assert.object(state)
  Assert.number(deltaY)
  const { headerHeight, height, itemHeight, items } = state
  const listHeight = getListHeight(height, headerHeight)
  const itemsLength = items.length
  const finalDeltaY = itemsLength * itemHeight - listHeight
  if (deltaY < 0) {
    deltaY = 0
  } else if (deltaY > finalDeltaY) {
    deltaY = Math.max(finalDeltaY, 0)
  }
  if (state.deltaY === deltaY) {
    return state
  }
  const minLineY = Math.round(deltaY / itemHeight)
  const maxLineY = minLineY + Math.round(listHeight / itemHeight)
  Assert.number(minLineY)
  Assert.number(maxLineY)
  return {
    ...state,
    deltaY,
    maxLineY,
    minLineY,
  }
}

export const handleWheel = (state: QuickPickState, deltaMode: number, deltaY: number): QuickPickState => {
  Assert.object(state)
  Assert.number(deltaMode)
  Assert.number(deltaY)
  return setDeltaY(state, state.deltaY + deltaY)
}

export const handleScrollBarPointerDown = (state: QuickPickState, clientY: number, pointerId: number): QuickPickState => {
  Assert.object(state)
  Assert.number(clientY)
  Assert.number(pointerId)
  const scrollBarHeight = getScrollBarHeight(state)
  if (scrollBarHeight <= 0) {
    return state
  }
  const scrollBarTop = getScrollBarTop(state, scrollBarHeight)
  const relativePointerY = getRelativePointerY(state, clientY)
  const scrollBarPointerOffsetY = clamp(relativePointerY - scrollBarTop, 0, scrollBarHeight)
  const newState = {
    ...state,
    scrollBarActive: true,
    scrollBarPointerId: pointerId,
    scrollBarPointerOffsetY,
  }
  return handleScrollBarPointerMove(newState, clientY, pointerId)
}

export const handleScrollBarPointerMove = (state: QuickPickState, clientY: number, pointerId: number): QuickPickState => {
  Assert.object(state)
  Assert.number(clientY)
  Assert.number(pointerId)
  if (!state.scrollBarActive || state.scrollBarPointerId !== pointerId) {
    return state
  }
  const scrollBarHeight = getScrollBarHeight(state)
  const scrollBarSize = state.height - state.headerHeight
  const maxScrollBarTop = Math.max(scrollBarSize - scrollBarHeight, 0)
  const relativePointerY = getRelativePointerY(state, clientY) - state.scrollBarPointerOffsetY
  const scrollBarTop = clamp(relativePointerY, 0, maxScrollBarTop)
  const deltaY = Math.round(ScrollBarFunctions.getDeltaY(scrollBarTop, state.finalDeltaY, scrollBarSize, scrollBarHeight))
  return setDeltaY(state, deltaY)
}

export const handleScrollBarPointerUp = (state: QuickPickState, pointerId: number): QuickPickState => {
  Assert.object(state)
  Assert.number(pointerId)
  if (!state.scrollBarActive || state.scrollBarPointerId !== pointerId) {
    return state
  }
  return {
    ...state,
    scrollBarActive: false,
    scrollBarPointerId: -1,
    scrollBarPointerOffsetY: 0,
  }
}
