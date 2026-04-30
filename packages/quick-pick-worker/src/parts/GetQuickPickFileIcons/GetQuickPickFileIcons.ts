import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetFileIconsCached from '../GetFileIconsCached/GetFileIconsCached.ts'
import * as GetPath from '../GetPath/GetPath.ts'
import * as GetMissingIconRequests from '../GetMissingIconRequests/GetMissingIconRequests.ts'
import * as RequestFileIcons from '../RequestFileIcons/RequestFileIcons.ts'
import * as ToDirent from '../ToDirent/ToDirent.ts'
import * as UpdateIconCache from '../UpdateIconCache/UpdateIconCache.ts'

export const getQuickPickFileIcons = async (
  items: readonly ProtoVisibleItem[],
  fileIconCache: FileIconCache,
): Promise<{
  icons: readonly string[]
  newFileIconCache: FileIconCache
}> => {
  const dirents = items.map(ToDirent.toDirent)
  const missingRequests = GetMissingIconRequests.getMissingIconRequests(dirents, fileIconCache)
  const newIcons = await RequestFileIcons.requestFileIcons(missingRequests)
  const newFileIconCache = UpdateIconCache.updateIconCache(fileIconCache, missingRequests, newIcons)
  const paths = dirents.map(GetPath.getPath)
  const icons = GetFileIconsCached.getIconsCached(paths, newFileIconCache)
  return {
    icons,
    newFileIconCache,
  }
}
