import { FileSearchWorker } from '@lvce-editor/rpc-registry'

export const searchFile = async (
  path: string,
  value: string,
  prepare: boolean,
  assetDir: string,
  ifNonMatch?: string | null,
): Promise<readonly string[] | { readonly hash: string; readonly matchesCache: boolean; readonly results: readonly string[] }> => {
  const result =
    ifNonMatch === undefined
      ? await FileSearchWorker.invoke('FileSearch.searchFile', path, value, prepare, assetDir)
      : await FileSearchWorker.invoke('FileSearch.searchFile', path, value, prepare, assetDir, ifNonMatch)
  return result
}
