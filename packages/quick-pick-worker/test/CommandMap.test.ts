import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickStates from '../src/parts/QuickPickStates/QuickPickStates.ts'

test('close command closes the quick pick for its uid', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.closeWidget': () => {},
  })
  const uid = 123
  const state = {
    ...CreateDefaultState.createDefaultState(),
    uid,
  }
  QuickPickStates.set(uid, state, state)

  await commandMap['QuickPick.close'](uid)

  expect(mockRpc.invocations).toEqual([['Viewlet.closeWidget', uid]])
})

test('select current index waits for a pending input update', async () => {
  const { promise: picks, resolve: resolvePicks } = Promise.withResolvers<readonly unknown[]>()
  const { promise: picksRequested, resolve: notifyPicksRequested } = Promise.withResolvers<void>()
  using mockRpc = RendererWorker.registerMockRpc({
    'Account.signIn': () => {},
    'ExtensionHost.getCommands': () => [],
    'Layout.getAllQuickPickMenuEntries': () => {
      notifyPicksRequested()
      return picks
    },
    'Viewlet.closeWidget': () => {},
    'Workspace.close': () => {},
  })
  const uid = 123
  const stalePick = {
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    id: 'Account.signIn',
    label: 'Account: Sign In',
    matches: [],
    uri: '',
  }
  const state = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items: [stalePick],
    picks: [stalePick],
    providerId: QuickPickEntryId.EveryThing,
    uid,
    value: '>',
  }
  QuickPickStates.set(uid, state, state)

  const pendingInput = commandMap['QuickPick.handleInput'](uid, '>Workspace: Close', 17, InputSource.User)
  await picksRequested
  const pendingSelection = commandMap['QuickPick.selectCurrentIndex'](uid)
  resolvePicks([{ id: 'Workspace.close', label: 'Workspace: Close' }])
  await Promise.all([pendingInput, pendingSelection])

  expect(mockRpc.invocations).toEqual([
    ['Layout.getAllQuickPickMenuEntries'],
    ['ExtensionHost.getCommands', '', 0],
    ['Workspace.close'],
    ['Viewlet.closeWidget', uid],
  ])
})
