import { RendererWorker } from '@lvce-editor/rpc-registry'
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

const getRemoteSshAuthority = (uri: string): string => {
  const pathStart = getRemoteSshPathStart(uri)
  return uri.slice(remoteSshScheme.length, pathStart === -1 ? uri.length : pathStart)
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

const toProtoVisibleItem = (uri: string, homeDir: string): ProtoVisibleItem => {
  const path = getPath(uri)
  const isRemoteSsh = uri.startsWith(remoteSshScheme)
  const authority = isRemoteSsh ? getRemoteSshAuthority(uri) : ''
  let folderName = path
  if (path.startsWith('/')) {
    folderName = Workspace.pathBaseName(path)
  }
  if (path === '/' && isRemoteSsh) {
    folderName = authority
  }
  let description = ''
  if (path.startsWith('/')) {
    description = Workspace.pathDirName(path)
    if (!isRemoteSsh && homeDir && (description === homeDir || description.startsWith(`${homeDir}/`))) {
      description = `~${description.slice(homeDir.length)}`
    }
  }
  if (path === '/' && isRemoteSsh) {
    description = '/'
  }
  const label = isRemoteSsh ? `${folderName} [SSH: ${authority}]` : folderName
  return {
    description,
    direntType: DirentType.Directory,
    fileIcon: '',
    icon: '',
    iconName: isRemoteSsh ? folderName : undefined,
    label,
    matches: [],
    removeButton: true,
    uri,
  }
}

export const getPicks = async (): Promise<readonly ProtoVisibleItem[]> => {
  const recentlyOpened = await GetRecentlyOpened.getRecentlyOpened()
  let homeDir = ''
  try {
    const value = await RendererWorker.invoke('Workspace.getHomeDir')
    homeDir = typeof value === 'string' ? value : ''
  } catch {
    // Ignore unavailable workspace RPCs and keep the full path.
  }
  const picks = recentlyOpened.map((uri) => toProtoVisibleItem(uri, homeDir))
  return picks
}
