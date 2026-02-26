import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderHeight = (newState: QuickPickViewModel): any => {
  const { height, uid } = newState
  if (height === 0) {
    return ['Viewlet.send', uid, /* method */ RenderMethod.SetItemsHeight, /* height */ 20]
  }
  return ['Viewlet.send', uid, /* method */ RenderMethod.SetItemsHeight, /* height */ height]
}
