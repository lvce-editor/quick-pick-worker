import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const initializeExtensionManagementWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.sendMessagePortToExtensionManagementWorker(port, 0)
    },
  })
  ExtensionManagementWorker.set(rpc)
}
