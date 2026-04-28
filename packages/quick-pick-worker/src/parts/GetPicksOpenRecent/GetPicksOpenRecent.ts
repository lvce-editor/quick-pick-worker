import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetRecentlyOpened from '../GetRecentlyOpened/GetRecentlyOpened.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const getPath = (uri: string): string => {
  if (uri.startsWith('file://')) {
    return uri.slice('file://'.length)
  }
  return uri
}

const getLabel = (uri: string): string => {
  const path = getPath(uri)
  if (path.startsWith('/')) {
    return Workspace.pathBaseName(path)
  }
  return path
}

const getDescription = (uri: string): string => {
  const path = getPath(uri)
  if (path.startsWith('/')) {
    return Workspace.pathDirName(path)
  }
  return ''
}

const toProtoVisibleItem = (uri: string): ProtoVisibleItem => {
  return {
    description: getDescription(uri),
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
