import type { Dirent } from '../Dirent/Dirent.ts'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const toDirent = (pick: ProtoVisibleItem): Dirent => {
  const dirent: Dirent = {
    name: pick.label,
    path: pick.uri,
    type: pick.direntType,
  }
  return dirent
}