import { RendererWorker } from '@lvce-editor/rpc-registry'

export const searchFile = async (uri: string): Promise<readonly string[]> => {
  return RendererWorker.invoke('ExtensionHost.searchFileWithHtml', uri)
}
