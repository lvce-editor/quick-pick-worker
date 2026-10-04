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

const resolveFileUri = (workspace: string, path: string): string => {
  if (hasUriScheme(path)) {
    return path
  }
  if (hasUriScheme(workspace)) {
    const workspaceUrl = new URL(workspace)
    const normalizedPath = path.replaceAll('\\', '/').replaceAll('%', '%25')
    const workspacePath = trimTrailingSeparators(workspaceUrl.pathname)
    workspaceUrl.pathname = normalizedPath.startsWith('/') ? normalizedPath : `${workspacePath}/${normalizedPath}`
    return workspaceUrl.href
  }
  if (isAbsolutePath(path)) {
    return path
  }
  return `${trimTrailingSeparators(workspace)}/${path}`
}

const convertToPick = (uri: string): ProtoVisibleItem => {
  const displayPath = hasUriScheme(uri) ? decodeURIComponent(new URL(uri).pathname) : uri.replaceAll('\\', '/')
  const baseName = Workspace.pathBaseName(displayPath)
  const dirName = Workspace.pathDirName(displayPath)

  return {
    description: dirName,
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
  const response = await SearchFile.searchFile(workspace, searchValue, true, '', cacheEnabled ? (cached?.hash ?? null) : undefined)
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
  const picks = files.map((path) => convertToPick(resolveFileUri(workspace, path)))
  return picks
}
