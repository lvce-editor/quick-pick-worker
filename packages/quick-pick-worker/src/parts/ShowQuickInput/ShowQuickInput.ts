import type { QuickInputOptions } from '../QuickInputOptions/QuickInputOptions.ts'
import type { QuickInputResult } from '../QuickInputResult/QuickInputResult.ts'
import * as ApplicationRendererRpc from '../ApplicationRendererRpc/ApplicationRendererRpc.ts'
import * as CustomQuickPickItems from '../CustomQuickPickItems/CustomQuickPickItems.ts'

export const showQuickInput = async ({
  applicationId,
  id,
  ignoreFocusOut,
  initialItems = [],
  initialValue,
  placeholder,
  type = id === undefined && initialItems.length === 0 ? 'text' : 'select',
  waitUntil,
}: QuickInputOptions): Promise<QuickInputResult> => {
  const customItemsId = CustomQuickPickItems.add(initialItems)
  const picks: readonly any[] = []
  try {
    const result = (await ApplicationRendererRpc.invoke(applicationId, 'QuickPick.showCustom', picks, {
      customItemsId,
      ignoreFocusOut,
      initialValue,
      mode: 'quickInput',
      placeholder,
      quickInputId: id,
      type,
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
