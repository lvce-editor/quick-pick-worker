import { expect, test } from '@jest/globals'
import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import * as CommandMapRef from '../src/parts/CommandMapRef/CommandMapRef.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { handleStatusBarMessagePort } from '../src/parts/HandleStatusBarMessagePort/HandleStatusBarMessagePort.ts'

test('routes status bar commands without replacing the extension host connection', async () => {
  const { port1, port2 } = new MessageChannel()
  using extensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostQuickPick.renderQuickInput': async () => [],
  })
  using rendererRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget': async () => {},
  })
  Object.assign(CommandMapRef.commandMapRef, commandMap)
  await handleStatusBarMessagePort(port1)
  const statusBarRpc = await PlainMessagePortRpc.create({
    commandMap: {},
    isMessagePortOpen: true,
    messagePort: port2,
  })

  try {
    await statusBarRpc.invoke('QuickPick.openStatusBarPicker', 'go-to-line', 3, 5)
    await ExtensionHostWorker.invoke('ExtensionHostQuickPick.renderQuickInput')

    expect(rendererRpc.invocations).toEqual([['Viewlet.openWidget', 'QuickPick', 'go-to-line', 3, 5]])
    expect(extensionHostRpc.invocations).toEqual([['ExtensionHostQuickPick.renderQuickInput']])
    expect(commandMap['QuickPick.handleStatusBarMessagePort']).toBe(handleStatusBarMessagePort)
  } finally {
    port1.close()
    port2.close()
  }
})
