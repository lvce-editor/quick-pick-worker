import type { Dirent } from '../Dirent/Dirent.ts'

export const getPath = (dirent: Dirent): string => {
  return dirent.path
}