import { expect, jest, test } from '@jest/globals'
import { PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererProcess } from '@lvce-editor/rpc-registry'
import { handleRendererProcessMessagePort } from '../src/parts/HandleRendererProcessMessagePort/HandleRendererProcessMessagePort.ts'

test('handleRendererProcessMessagePort connects the quick pick worker to the renderer process', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 31)
  const { port1, port2 } = new MessageChannel()
  const rendererProcessRpc = await PlainMessagePortRpcParent.create({
    commandMap: {
      'Viewlet.queueCommands': queueCommands,
    },
    messagePort: port1,
  })

  await handleRendererProcessMessagePort(port2)
  await expect(RendererProcess.invoke('Viewlet.queueCommands', 7, [['Viewlet.setDom2', []]])).resolves.toBe(31)
  expect(queueCommands).toHaveBeenCalledWith(7, [['Viewlet.setDom2', []]])

  await RendererProcess.dispose()
  await rendererProcessRpc.dispose()
})
