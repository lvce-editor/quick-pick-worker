import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderHeight = (_oldState: QuickPickState, newState: QuickPickState): any => {
  const { height, uid } = newState
  if (height === 0) {
    return ['Viewlet.send', uid, /* method */ RenderMethod.SetItemsHeight, /* height */ 20]
  }
  return ['Viewlet.send', uid, /* method */ RenderMethod.SetItemsHeight, /* height */ height]
}
