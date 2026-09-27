import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import { emptyMatches } from '../EmptyMatches/EmptyMatches.ts'
import * as GetWorkspacePath from '../GetWorkspacePath/GetWorkspacePath.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const searchFile = async (path: string, value: string): Promise<readonly string[]> => {
  const prepare = true
  const files = await SearchFile.searchFile(/* path */ path, /* searchTerm */ value, prepare, '')
  return files
}

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
    const normalizedPath = path.replaceAll('\\', '/')
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
  const baseName = Workspace.pathBaseName(uri)
  const dirName = Workspace.pathDirName(uri)

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
  const files = await searchFile(workspace, searchValue)
  const picks = files.map((path) => convertToPick(resolveFileUri(workspace, path)))
  return picks
}
