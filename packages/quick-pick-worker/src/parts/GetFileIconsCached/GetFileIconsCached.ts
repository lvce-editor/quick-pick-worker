import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'

export const getIconsCached = (paths: readonly string[], fileIconCache: FileIconCache): string[] => {
  return paths.map((path) => fileIconCache[path])
}
