/* eslint-disable virtual-dom/no-raw-text-children -- Quick pick options use a type field but are not virtual DOM nodes. */
import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'
import * as LoadContent from '../src/parts/LoadContent/LoadContent.ts'
import * as QuickPickEntryUri from '../src/parts/QuickPickEntryUri/QuickPickEntryUri.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import * as SelectPickCustom from '../src/parts/SelectPickCustom/SelectPickCustom.ts'

test('text input loads and accepts freeform text without list work or list semantics', async () => {
  using extensionRpc = ExtensionHostWorker.registerMockRpc({})
  using rendererRpc = RendererWorker.registerMockRpc({ 'QuickPick.executeCallback': () => undefined })
  const state = await LoadContent.loadContent({
    ...CreateDefaultState.createDefaultState(),
    args: ['custom', [], 42, { initialValue: 'World', mode: 'quickInput', type: 'text' }],
    uri: QuickPickEntryUri.Custom,
  })
  expect(state.value).toBe('World')
  for (const value of ['Ada', '> anything', '', 'World']) {
    const updated = await HandleInput.handleInput(state, value, value.length)
    expect(updated.value).toBe(value)
    expect(updated.cursorOffset).toBe(value.length)
    expect(updated.items).toBe(state.items)
    expect(updated.picks).toBe(state.picks)
    expect(updated.fileIconCache).toBe(state.fileIconCache)
    const dom = RenderItems.renderItemsDom(updated)
    expect(dom.some((node) => node.text === 'No Results')).toBe(false)
    expect(dom.some((node) => node.role === 'listbox' || node.role === 'combobox')).toBe(false)
    expect(dom.some((node) => node.ariaAutoComplete === 'list')).toBe(false)
  }
  expect(extensionRpc.invocations).toEqual([])
  expect(rendererRpc.invocations).toEqual([])
  await SelectPickCustom.selectPick({ description: '', direntType: 0, fileIcon: '', icon: '', label: '', matches: [], uri: '' }, 'Ada')
  expect(rendererRpc.invocations).toEqual([['QuickPick.executeCallback', 42, { canceled: false, inputValue: 'Ada' }]])
})

test('empty selection pickers still display No Results', async () => {
  const state = await LoadContent.loadContent({
    ...CreateDefaultState.createDefaultState(),
    args: ['custom', [], 42, { mode: 'quickPick', type: 'select' }],
    uri: QuickPickEntryUri.Custom,
  })
  const dom = RenderItems.renderItemsDom(state)
  expect(dom.some((node) => node.text === 'No Results')).toBe(true)
  expect(dom.some((node) => node.role === 'combobox')).toBe(true)
})
