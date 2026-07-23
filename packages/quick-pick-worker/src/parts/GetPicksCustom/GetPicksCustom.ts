import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as CustomQuickPickItems from '../CustomQuickPickItems/CustomQuickPickItems.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'

const toProtoVisibleItem = (item: any): ProtoVisibleItem => {
  const { description = '', label, value } = item
  return {
    description,
    direntType: 0,
    fileIcon: '',
    icon: '',
    label,
    matches: [],
    uri: '',
    value,
  }
}

export const getPicks = async (searchValue: string, args: readonly unknown[]): Promise<readonly ProtoVisibleItem[]> => {
  state.args = args
  const options = args.at(-1) as any
  let items: readonly unknown[]
  if (options?.mode === 'quickInput') {
    items =
      searchValue === '' && options?.customItemsId
        ? CustomQuickPickItems.get(options.customItemsId)
        : ((await ExtensionHostWorker.invoke('ExtensionHostQuickPick.renderQuickInput', options.quickInputId, searchValue)) as readonly unknown[])
  } else {
    items = options?.customItemsId ? CustomQuickPickItems.get(options.customItemsId) : (args[1] as readonly unknown[]) || []
  }
  const mapped = items.map(toProtoVisibleItem)
  return mapped
}
