import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openUri = async (uri: string): Promise<void> => {
  await RendererWorker.openUri(uri)
}
