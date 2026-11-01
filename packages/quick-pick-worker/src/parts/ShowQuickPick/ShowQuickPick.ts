import * as ApplicationRendererRpc from '../ApplicationRendererRpc/ApplicationRendererRpc.ts'
import * as CustomQuickPickItems from '../CustomQuickPickItems/CustomQuickPickItems.ts'
import * as QuickPickCallbacks from '../QuickPickCallbacks/QuickPickCallbacks.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

interface QuickPickItem {
  readonly description: string
  readonly icon?: string
  readonly label: string
  readonly value: unknown
}

export interface ShowQuickPickOptions {
  readonly acceptInput?: boolean
  readonly applicationId?: string
  readonly items: readonly QuickPickItem[]
  readonly placeholder?: string
  readonly type?: 'text' | 'select'
  readonly waitUntil?: 'selected' | 'visible'
}

export const showQuickPick = async ({
  acceptInput = false,
  applicationId,
  items,
  placeholder = '',
  type = 'select',
  waitUntil = 'selected',
}: ShowQuickPickOptions): Promise<unknown> => {
  const customItemsId = CustomQuickPickItems.add(type === 'text' ? [] : items)
  const { id, promise } = QuickPickCallbacks.registerCallback()
  try {
    await ApplicationRendererRpc.invoke(applicationId, 'Viewlet.openWidget', ViewletModuleId.QuickPick, 'custom', [], id, {
      acceptInput: type === 'text' || acceptInput,
      callbackOwner: 'quickPickWorker',
      customItemsId,
      mode: 'quickPick',
      placeholder,
      type,
    })
    if (waitUntil === 'visible') {
      return undefined
    }
    return await promise
  } finally {
    CustomQuickPickItems.remove(customItemsId)
  }
}
