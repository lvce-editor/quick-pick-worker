import { RendererWorker } from '@lvce-editor/rpc-registry'

const uniq = (array: readonly string[]): readonly string[] => {
  return [...new Set(array)]
}

export const getRecentlyOpened = async (): Promise<readonly string[]> => {
  const recentlyOpened = (await RendererWorker.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')) as readonly string[]
  return uniq(recentlyOpened)
}
