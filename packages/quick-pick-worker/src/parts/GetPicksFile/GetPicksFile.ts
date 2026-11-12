import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import { emptyMatches } from '../EmptyMatches/EmptyMatches.ts'
import * as GetWorkspacePath from '../GetWorkspacePath/GetWorkspacePath.ts'
import * as QuickPickCache from '../QuickPickCache/QuickPickCache.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const isFileList = (
  value: readonly string[] | { readonly hash: string; readonly matchesCache: boolean; readonly results: readonly string[] },
): value is readonly string[] => Array.isArray(value)

const hasUriScheme = (path: string): boolean => /^[a-z][a-z\d+.-]*:/i.test(path) && !/^[a-z]:[\\/]/i.test(path)

const isAbsolutePath = (path: string): boolean => path.startsWith('/') || /^[a-z]:[\\/]/i.test(path)

const trimTrailingSeparators = (path: string): string => {
  let result = path
  while (result.endsWith('/') || result.endsWith('\\')) {
    result = result.slice(0, -1)
  }
  return result
}

const normalizePath = (path: string): string => path.replaceAll('\\', '/')

interface WorkspaceDisplayPath {
  readonly host?: string
  readonly path: string
  readonly scheme?: string
  readonly uriPrefix?: string
  readonly url?: URL
}

const getWorkspaceDisplayPath = (workspace: string): WorkspaceDisplayPath => {
  if (!hasUriScheme(workspace)) {
    return { path: normalizePath(workspace) }
  }
  const url = new URL(workspace)
  const uriPrefix =
    url.search || url.hash || !url.pathname.startsWith('/') ? undefined : `${url.protocol}//${url.host}${trimTrailingSeparators(url.pathname)}/`
  return {
    host: url.host,
    path: decodeURIComponent(url.pathname),
    scheme: url.protocol,
    uriPrefix,
    url,
  }
}

const isSafeRelativePath = (path: string): boolean =>
  /^[a-z\d._~/-]+$/i.test(path) && path.split('/').every((segment) => segment !== '.' && segment !== '..')

const getRelativeDirectory = (workspacePath: WorkspaceDisplayPath, uri: string, dirName: string, isWorkspaceRelative: boolean): string => {
  if (!isWorkspaceRelative && hasUriScheme(uri)) {
    const url = new URL(uri)
    if (workspacePath.scheme !== url.protocol || workspacePath.host !== url.host) {
      return dirName
    }
  } else if (!isWorkspaceRelative && workspacePath.scheme) {
    return dirName
  }
  const normalizedWorkspace = trimTrailingSeparators(workspacePath.path)
  const normalizedDirectory = normalizePath(dirName)
  const prefix = normalizedWorkspace.endsWith('/') ? normalizedWorkspace : `${normalizedWorkspace}/`
  if (normalizedDirectory === normalizedWorkspace) {
    return ''
  }
  if (!normalizedDirectory.startsWith(prefix)) {
    return dirName
  }
  return normalizedDirectory.slice(prefix.length)
}

const resolveFileUri = (workspace: string, path: string, workspacePath: WorkspaceDisplayPath): string => {
  if (hasUriScheme(path)) {
    return path
  }
  if (workspacePath.url) {
    if (workspacePath.uriPrefix && !isAbsolutePath(path) && isSafeRelativePath(path)) {
      return `${workspacePath.uriPrefix}${path}`
    }
    const workspaceUrl = new URL(workspacePath.url)
    const normalizedPath = path.replaceAll('\\', '/').replaceAll('%', '%25')
    const workspaceUrlPath = trimTrailingSeparators(workspaceUrl.pathname)
    workspaceUrl.pathname = normalizedPath.startsWith('/') ? normalizedPath : `${workspaceUrlPath}/${normalizedPath}`
    return workspaceUrl.href
  }
  if (isAbsolutePath(path)) {
    return path
  }
  return `${trimTrailingSeparators(workspace)}/${path}`
}

const convertToPick = (workspacePath: WorkspaceDisplayPath, uri: string, path: string): ProtoVisibleItem => {
  const isWorkspaceRelative = Boolean(workspacePath.uriPrefix && !isAbsolutePath(path) && !hasUriScheme(path) && isSafeRelativePath(path))
  let displayPath = uri.replaceAll('\\', '/')
  if (isWorkspaceRelative) {
    displayPath = `${trimTrailingSeparators(workspacePath.path)}/${path}`
  } else if (hasUriScheme(uri)) {
    displayPath = decodeURIComponent(new URL(uri).pathname)
  }
  const baseName = Workspace.pathBaseName(displayPath)
  const dirName = Workspace.pathDirName(displayPath)
  const description = getRelativeDirectory(workspacePath, uri, dirName, isWorkspaceRelative)

  return {
    description,
    direntType: DirentType.File,
    fileIcon: '',
    icon: '',
    label: baseName,
    matches: emptyMatches,
    uri,
  }
}

// TODO handle files differently
// e.g. when there are many files, don't need
// to compute the fileIcon for all files

export const getPicks = async (searchValue: string): Promise<readonly ProtoVisibleItem[]> => {
  // TODO cache workspace path
  const workspace = await GetWorkspacePath.getWorkspacePath()
  if (!workspace) {
    return []
  }
  let cacheEnabled = false
  try {
    cacheEnabled = (await RendererWorker.invoke('Preferences.get', 'quickPick.cache')) !== false
  } catch {
    // If preferences are unavailable, preserve the existing uncached search behavior.
  }
  const cached = cacheEnabled ? await QuickPickCache.get(workspace) : undefined
  let response: Awaited<ReturnType<typeof SearchFile.searchFile>>
  try {
    response = await SearchFile.searchFile(workspace, searchValue, true, '', cacheEnabled ? (cached?.hash ?? null) : undefined)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await RendererWorker.invoke('Notification.create', 'error', `Could not search workspace files: ${message}`)
    return []
  }
  let files: readonly string[]
  if (isFileList(response)) {
    files = response
  } else if (response.matchesCache && cached) {
    files = cached.results
  } else {
    files = response.results
    if (cacheEnabled && !isFileList(response)) {
      await QuickPickCache.set(workspace, { hash: response.hash, results: files })
    }
  }
  if (files.length === 0) {
    return []
  }
  const workspacePath = getWorkspaceDisplayPath(workspace)
  const picks = files.map((path) => convertToPick(workspacePath, resolveFileUri(workspace, path, workspacePath), path))
  return picks
}
