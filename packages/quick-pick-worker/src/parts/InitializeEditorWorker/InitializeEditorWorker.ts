import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const initializeEditorWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.sendMessagePortToEditorWorker(port, 0)
    },
  })
  EditorWorker.set(rpc)
}
