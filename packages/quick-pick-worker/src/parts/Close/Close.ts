import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as CloseWidget from '../CloseWidget/CloseWidget.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'

const getCancelResult = (args: readonly unknown[]): unknown => {
  const last = args.at(-1)
  if (last && typeof last === 'object' && // @ts-ignore
    last.mode === 'quickPick') {
      return undefined
    }
  return {
    canceled: true,
    inputValue: '',
  }
}

export const close = async (state: QuickPickState): Promise<QuickPickState> => {
  const { args, providerId } = state
  if (providerId === QuickPickEntryId.Custom) {
    const resolveId = args[2]
    await RendererWorker.invoke('QuickPick.executeCallback', resolveId, getCancelResult(args))
  }
  await CloseWidget.closeWidget(state.uid)
  return state
}
