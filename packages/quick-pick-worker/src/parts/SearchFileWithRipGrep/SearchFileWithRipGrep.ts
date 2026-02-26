// TODO create direct connection from electron to file search worker using message ports

import * as GetFileSearchRipGrepArgs from '../GetFileSearchRipGrepArgs/GetFileSearchRipGrepArgs.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'
import * as SplitLines from '../SplitLines/SplitLines.ts'

export const searchFile = async (path: string, value: string, prepare: boolean): Promise<readonly string[]> => {
  const ripGrepArgs = GetFileSearchRipGrepArgs.getFileSearchRipGrepArgs()
  const options = {
    limit: 9_999_999,
    ripGrepArgs,
    searchPath: path,
  }
  const stdout = await SearchProcess.invoke('SearchFile.searchFile', options)
  const lines = SplitLines.splitLines(stdout)
  return lines
}
