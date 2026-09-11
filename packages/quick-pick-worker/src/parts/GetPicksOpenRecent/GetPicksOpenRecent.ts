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
      const path = decodePath(uri.slice(pathStart))
      let end = path.length
      while (end > 1 && path[end - 1] === '/') {
        end--
      }
      return path.slice(0, end)
    }
    return '/'
  }
  return uri
}

const getLabel = (uri: string): string => {
  const path = getPath(uri)
  if (path === '/' && uri.startsWith(remoteSshScheme)) {
    const pathStart = getRemoteSshPathStart(uri)
    return uri.slice(remoteSshScheme.length, pathStart === -1 ? uri.length : pathStart)
  }
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
      const authority = pathStart === -1 ? uri : uri.slice(0, pathStart)
      return `${authority}${path === '/' ? '/' : directory}`
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
