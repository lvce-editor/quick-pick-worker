import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickInputOptions } from '../QuickInputOptions/QuickInputOptions.ts'
import type { QuickInputResult } from '../QuickInputResult/QuickInputResult.ts'

export const showQuickInput = async ({ id, ignoreFocusOut, initialValue, waitUntil }: QuickInputOptions): Promise<QuickInputResult> => {
  const picks: readonly any[] = []
  const result = (await RendererWorker.invoke('QuickPick.showCustom', picks, {
    ignoreFocusOut,
    initialValue,
    mode: 'quickInput',
    quickInputId: id,
    waitUntil,
  })) as QuickInputResult | undefined
  return (
    result ?? {
      canceled: true,
      inputValue: '',
    }
  )
}
