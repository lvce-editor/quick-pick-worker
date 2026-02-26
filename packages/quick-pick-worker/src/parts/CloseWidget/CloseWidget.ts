import { RendererWorker } from '@lvce-editor/rpc-registry'

export const closeWidget = async (id: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.closeWidget(id)
}
