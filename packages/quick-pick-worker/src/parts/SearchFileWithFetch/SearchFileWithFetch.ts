import { RendererWorker } from '@lvce-editor/rpc-registry'

// TODO simplify code
// 1. don't have playground prefix in fileMap json
// 2. remove code here that removes the prefix
export const searchFile = async (path: string): Promise<readonly string[]> => {
  return RendererWorker.invoke('ExtensionHost.searchFileWithFetch', path)
}
