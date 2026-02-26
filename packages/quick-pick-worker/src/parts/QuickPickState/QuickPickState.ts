import type { List } from '@lvce-editor/list'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export interface QuickPickState extends List<any> {
  readonly allowEmptyResult: boolean
  readonly args: readonly unknown[]
  readonly assetDir: string
  readonly cursorOffset: number
  readonly fileIconCache: FileIconCache
  readonly focused: boolean
  readonly focusedIndex: number
  readonly headerHeight: number
  readonly height: number
  readonly icons: readonly string[]
  readonly inputSource: number
  readonly itemHeight: number
  readonly items: readonly ProtoVisibleItem[]
  readonly maxVisibleItems: number
  readonly minimumSliderSize: number
  readonly picks: readonly ProtoVisibleItem[]
  readonly placeholder: string
  readonly platform: number
  readonly providerId: number
  readonly recentPickIds: Map<any, any>
  readonly recentPicks: readonly unknown[]
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly state: number
  readonly top: number
  readonly touchDifference: number
  readonly touchOffsetY: number
  readonly touchTimeStamp: number
  readonly uid: number
  readonly uri: string
  readonly value: string
  readonly versionId: number
  readonly warned: unknown[]
  readonly width: number
  readonly workspaceUri: string
}
