import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

interface ChatQuickPickItem {
  readonly id: string
  readonly title: string
}

export const getPicks = async (
  searchValue: string,
  _args: readonly unknown[],
  { applicationId }: { applicationId?: string; assetDir: string; platform: number },
): Promise<readonly ProtoVisibleItem[]> => {
  const result = applicationId
    ? await ExtensionHostWorker.invoke('Application.execute', applicationId, 'ExtensionHost.executeCommand', 'chat2.getQuickPickItems')
    : await ExtensionHostWorker.invoke('ExtensionHost.executeCommand', 'chat2.getQuickPickItems')
  const items = Array.isArray(result) ? (result as readonly ChatQuickPickItem[]) : []
  const normalizedSearch = searchValue.trim().toLocaleLowerCase()
  return items
    .filter((item) => typeof item.id === 'string' && typeof item.title === 'string' && item.title.toLocaleLowerCase().includes(normalizedSearch))
    .map(({ id, title }) => ({
      args: [id],
      command: 'ExtensionHost.executeCommand',
      description: '',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: title,
      matches: [],
      uri: '',
      value: id,
    }))
}
