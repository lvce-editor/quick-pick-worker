import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetRecentlyOpened from '../GetRecentlyOpened/GetRecentlyOpened.ts'

const getLabel = (uri: string): string => {
  if (uri.startsWith('file://')) {
    return uri.slice('file://'.length)
  }
  return uri
}

const toProtoVisibleItem = (uri: string): ProtoVisibleItem => {
  return {
    description: '',
    direntType: DirentType.Directory,
    fileIcon: '',
    icon: '',
    label: getLabel(uri),
    matches: [],
    uri,
  }
}

export const getPicks = async (): Promise<readonly ProtoVisibleItem[]> => {
  const recentlyOpened = await GetRecentlyOpened.getRecentlyOpened()
  const picks = recentlyOpened.map(toProtoVisibleItem)
  return picks
}
