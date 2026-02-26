import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export interface QuickPickViewModel {
  readonly cursorOffset: number
  readonly focused: boolean
  readonly height: number
  readonly newFocusedIndex: number
  readonly oldFocusedIndex: number
  readonly scrollBarHeight: number
  readonly scrollBarTop: number
  readonly uid: number
  readonly value: string
  readonly visibleItems: readonly VisibleItem[]
}
