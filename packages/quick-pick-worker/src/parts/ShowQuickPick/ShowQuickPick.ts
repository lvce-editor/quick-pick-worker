import { RendererWorker } from '@lvce-editor/rpc-registry'

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
  return RendererWorker.invoke('QuickPick.showCustom', items, {
    mode: 'quickPick',
    placeholder,
  })
}
