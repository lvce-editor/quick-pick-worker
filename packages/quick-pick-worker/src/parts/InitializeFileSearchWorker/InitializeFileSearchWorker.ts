import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { FileSearchWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const initializeFileSearchWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.sendMessagePortToFileSearchWorker(port, 0)
    },
  })
  FileSearchWorker.set(rpc)
}