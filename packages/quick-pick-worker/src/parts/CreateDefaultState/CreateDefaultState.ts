import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as QuickPickOpenState from '../QuickPickOpenState/QuickPickOpenState.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'

export const createDefaultState = (): QuickPickState => {
  const virtualList = VirtualList.create({
    headerHeight: 38,
    itemHeight: 30,
    minimumSliderSize: 20,
  })
  return {
    ...virtualList,
    allowEmptyResult: false,
    args: [],
    assetDir: '',
    cursorOffset: 0,
    fileIconCache: Object.create(null),
    focused: false,
    height: 300,
    icons: [],
    inputSource: InputSource.User,
    maxVisibleItems: 10,
    picks: [],
    platform: 0,
    providerId: 0,
    recentPickIds: Object.create(null),
    recentPicks: [],
    scrollBarActive: false,
    state: QuickPickOpenState.Default,
    top: 50,
    touchDifference: 0,
    touchOffsetY: 0,
    touchTimeStamp: 0,
    uid: 1,
    uri: '',
    value: '',
    versionId: 0,
    warned: [],
    width: 600,
    workspaceUri: '',
  }
}
