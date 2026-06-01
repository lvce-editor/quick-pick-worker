import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CustomQuickPickItems from '../CustomQuickPickItems/CustomQuickPickItems.ts'

export interface QuickPickItem {
  readonly description: string
  readonly label: string
  readonly value: unknown
}

export interface ShowQuickPickOptions {
  readonly items: readonly QuickPickItem[]
  readonly placeholder?: string
}

export const showQuickPick = async ({ items, placeholder = '' }: ShowQuickPickOptions): Promise<unknown> => {
  const customItemsId = CustomQuickPickItems.add(items)
  try {
    return await RendererWorker.invoke('QuickPick.showCustom', [], {
      customItemsId,
      mode: 'quickPick',
      placeholder,
    })
  } finally {
    CustomQuickPickItems.remove(customItemsId)
  }
}
