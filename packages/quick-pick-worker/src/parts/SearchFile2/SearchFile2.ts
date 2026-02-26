import { FileSearchWorker } from '@lvce-editor/rpc-registry'

export const searchFile2 = async (path: string, value: string, prepare: boolean, assetDir: string): Promise<readonly string[]> => {
  const result = await FileSearchWorker.invoke('FileSearch.searchFile', path, value, prepare, assetDir)
  return result
}
