import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickInputOptions } from '../QuickInputOptions/QuickInputOptions.ts'
import type { QuickInputResult } from '../QuickInputResult/QuickInputResult.ts'

export const showQuickInput = async ({ ignoreFocusOut, initialValue, waitUntil }: QuickInputOptions): Promise<QuickInputResult> => {
  // TODO ask renderer worker to create quickpick instance, with given options
  const picks: readonly any[] = []
  // const id=QuickPickCallbacks.registerCallback()
  await RendererWorker.invoke('QuickPick.showCustom', picks, { ignoreFocusOut, initialValue, waitUntil })
  return {
    canceled: false,
    inputValue: '',
  }
}
