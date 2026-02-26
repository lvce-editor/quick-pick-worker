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
  const picks = files.map(convertToPick)
  return picks
}
