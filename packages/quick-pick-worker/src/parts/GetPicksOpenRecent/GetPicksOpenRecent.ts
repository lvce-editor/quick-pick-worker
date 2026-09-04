import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetRecentlyOpened from '../GetRecentlyOpened/GetRecentlyOpened.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const fileScheme = 'file://'
const remoteSshScheme = 'remote-ssh://'

const decodePath = (path: string): string => {
  try {
    return decodeURIComponent(path)
  } catch {
    return path
  }
}

const getRemoteSshPathStart = (uri: string): number => {
  return uri.indexOf('/', remoteSshScheme.length)
}

const getPath = (uri: string): string => {
  if (uri.startsWith(fileScheme)) {
    return decodePath(uri.slice(fileScheme.length))
  }
  if (uri.startsWith(remoteSshScheme)) {
    const pathStart = getRemoteSshPathStart(uri)
    if (pathStart !== -1) {
      return decodePath(uri.slice(pathStart))
    }
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
    const directory = Workspace.pathDirName(path)
    if (uri.startsWith(remoteSshScheme)) {
      const pathStart = getRemoteSshPathStart(uri)
      return `${uri.slice(0, pathStart)}${directory}`
    }
    return directory
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
