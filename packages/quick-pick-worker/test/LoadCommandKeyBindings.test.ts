import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import { getKeyLabel, loadCommandKeyBindings } from '../src/parts/LoadCommandKeyBindings/LoadCommandKeyBindings.ts'

test('disabled by default', async () => {
  RendererWorker.registerMockRpc({ 'Preferences.get': () => undefined })
  expect(await loadCommandKeyBindings()).toEqual({})
})

test('loads extension bindings and gives user bindings precedence', async () => {
  RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => JSON.stringify([{ command: 'QuickPick.showCommands', key: 'Ctrl+Y' }]),
    'KeyBindingsInitial.getKeyBindings': () => [
      { command: 'QuickPick.showCommands', key: KeyCode.F1 },
      { args: ['test.command'], command: 'ExtensionHost.executeCommand', key: 2048 | KeyCode.KeyU },
    ],
    'Preferences.get': () => true,
  })
  expect(await loadCommandKeyBindings()).toEqual({ 'ext.test.command': 'Ctrl+U', 'QuickPick.showCommands': 'Ctrl+Y' })
})

test('formats modifiers and rejects invalid numeric keys', () => {
  expect(getKeyLabel(2048 | 1024 | 512 | 256 | KeyCode.KeyA)).toBe('Ctrl+Shift+Alt+Meta+A')
  expect(getKeyLabel(undefined)).toBe('')
  expect(getKeyLabel(-1)).toBe('')
  expect(getKeyLabel(0)).toBe('')
})

test('uses application context and tolerates missing user settings', async () => {
  const rpc = RendererWorker.registerMockRpc({
    'Application.execute': async (applicationId: unknown, method: unknown) => {
      expect(applicationId).toBe('application-1')
      if (method === 'Preferences.get') return true
      if (method === 'KeyBindingsInitial.getKeyBindings') return [{ command: 'Test.run', key: KeyCode.F1 }]
      throw new Error('file missing')
    },
  })
  expect(await loadCommandKeyBindings('application-1')).toEqual({ 'Test.run': 'F1' })
  expect(rpc.invocations).toHaveLength(3)
})

test('ignores persisted system entries and invalid bindings', async () => {
  RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => JSON.stringify([{ command: 'Test.run', key: KeyCode.F2, source: 'System' }]),
    'KeyBindingsInitial.getKeyBindings': () => [
      { command: 'Test.run', key: KeyCode.F1 },
      { command: 'Test.empty', key: 0 },
    ],
    'Preferences.get': () => true,
  })
  expect(await loadCommandKeyBindings()).toEqual({ 'Test.run': 'F1' })
})

test('keeps the command palette available if the keybinding service fails', async () => {
  RendererWorker.registerMockRpc({
    'KeyBindingsInitial.getKeyBindings': () => {
      throw new Error('unavailable')
    },
    'Preferences.get': () => true,
  })
  expect(await loadCommandKeyBindings()).toEqual({})
})
