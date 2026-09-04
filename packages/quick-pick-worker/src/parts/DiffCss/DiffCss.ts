import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const isEqual = (oldState: QuickPickState, newState: QuickPickState): boolean => {
  return (
    oldState.deltaY === newState.deltaY &&
    oldState.finalDeltaY === newState.finalDeltaY &&
    oldState.headerHeight === newState.headerHeight &&
    oldState.height === newState.height &&
    oldState.itemHeight === newState.itemHeight &&
    oldState.items.length === newState.items.length &&
    oldState.minimumSliderSize === newState.minimumSliderSize
  )
}
