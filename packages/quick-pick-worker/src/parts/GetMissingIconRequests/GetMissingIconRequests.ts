import type { Dirent } from '../Dirent/Dirent.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'

export const getMissingIconRequests = (dirents: readonly Dirent[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests: IconRequest[] = []

  for (const dirent of dirents) {
    if (!dirent.path) {
      continue
    }
    if (!(dirent.path in fileIconCache)) {
      missingRequests.push({
        name: dirent.name,
        path: dirent.path,
        type: dirent.type,
      })
    }
  }

  return missingRequests
}
