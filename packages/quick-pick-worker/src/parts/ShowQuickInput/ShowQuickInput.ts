import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickInputOptions } from '../QuickInputOptions/QuickInputOptions.ts'
import type { QuickInputResult } from '../QuickInputResult/QuickInputResult.ts'
import * as CustomQuickPickItems from '../CustomQuickPickItems/CustomQuickPickItems.ts'

export const showQuickInput = async ({ id, ignoreFocusOut, initialItems = [], initialValue, waitUntil }: QuickInputOptions): Promise<QuickInputResult> => {
  const customItemsId = CustomQuickPickItems.add(initialItems)
  const picks: readonly any[] = []
  try {
    const result = (await RendererWorker.invoke('QuickPick.showCustom', picks, {
      customItemsId,
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
  } finally {
    CustomQuickPickItems.remove(customItemsId)
  }
}
