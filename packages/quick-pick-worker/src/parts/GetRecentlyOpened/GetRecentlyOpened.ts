import { RendererWorker } from '@lvce-editor/rpc-registry'
import uniq from 'lodash-es/uniq.js'

export const getRecentlyOpened = async (): Promise<readonly string[]> => {
  const recentlyOpened = (await RendererWorker.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')) as readonly string[]
  return uniq(recentlyOpened)
}
