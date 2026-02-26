import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getRecentlyOpened = (): Promise<readonly string[]> => {
  return RendererWorker.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
}
