import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CustomQuickPickItems from '../CustomQuickPickItems/CustomQuickPickItems.ts'
import * as QuickPickCallbacks from '../QuickPickCallbacks/QuickPickCallbacks.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export interface QuickPickItem {
  readonly description: string
  readonly label: string
  readonly value: unknown
}

export interface ShowQuickPickOptions {
  readonly items: readonly QuickPickItem[]
  readonly placeholder?: string
  readonly waitUntil?: 'selected' | 'visible'
}

export const showQuickPick = async ({ items, placeholder = '', waitUntil = 'selected' }: ShowQuickPickOptions): Promise<unknown> => {
  const customItemsId = CustomQuickPickItems.add(items)
  const { id, promise } = QuickPickCallbacks.registerCallback()
  try {
    await RendererWorker.invoke('Viewlet.openWidget', ViewletModuleId.QuickPick, 'custom', [], id, {
      callbackOwner: 'quickPickWorker',
      customItemsId,
      mode: 'quickPick',
      placeholder,
    })
    if (waitUntil === 'visible') {
      return undefined
    }
    return await promise
  } finally {
    CustomQuickPickItems.remove(customItemsId)
  }
}
