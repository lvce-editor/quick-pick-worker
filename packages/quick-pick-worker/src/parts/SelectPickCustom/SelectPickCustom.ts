import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import * as QuickPickCallbacks from '../QuickPickCallbacks/QuickPickCallbacks.ts'
import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

const getOptions = (args: readonly unknown[]): any => {
  const last = args.at(-1)
  if (!last || typeof last !== 'object') {
    return {}
  }
  return last
}

export const selectPick = async (_pick: ProtoVisibleItem, value: string): Promise<SelectPickResult> => {
  const { args } = state
  const options = getOptions(args)
  const resolveId = args[2]
  let result
  if (options.mode === 'quickPick') {
    result = options.acceptInput && _pick.value === undefined ? value : _pick.value
  } else {
    result = {
      canceled: false,
      inputValue: value,
    }
  }
  if (options.callbackOwner === 'quickPickWorker') {
    if (typeof resolveId !== 'number') {
      throw new TypeError('expected resolve id to be a number')
    }
    QuickPickCallbacks.executeCallback(resolveId, result)
  } else {
    await RendererWorker.invoke('QuickPick.executeCallback', resolveId, result)
  }
  return {
    command: QuickPickReturnValue.Hide,
  }
}
