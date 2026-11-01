import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const handleMessagePort = async (port: MessagePort): Promise<void> => {
  const rpc = await PlainMessagePortRpc.create({
    commandMap: CommandMapRef.commandMapRef,
    isMessagePortOpen: true,
    messagePort: port,
  })
  ExtensionHostWorker.set(rpc)
}
