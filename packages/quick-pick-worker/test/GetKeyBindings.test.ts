import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import * as GetKeyBindings from '../src/parts/GetKeyBindings/GetKeyBindings.ts'
import * as KeyCode from '../src/parts/KeyCode/KeyCode.ts'

test('returns array of key bindings', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(Array.isArray(keyBindings)).toBe(true)
  expect(keyBindings.length).toBe(6)
})

test('has correct escape key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    args: ['QuickPick'],
    command: 'Viewlet.closeWidget',
    key: KeyCode.Escape,
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct up arrow key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    command: 'QuickPick.focusPrevious',
    key: KeyCode.UpArrow,
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct down arrow key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    command: 'QuickPick.focusNext',
    key: KeyCode.DownArrow,
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct page up key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    command: 'QuickPick.focusFirst',
    key: KeyCode.PageUp,
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct page down key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    command: 'QuickPick.focusLast',
    key: KeyCode.PageDown,
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct enter key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    command: 'QuickPick.selectCurrentIndex',
    key: KeyCode.Enter,
    when: WhenExpression.FocusQuickPickInput,
  })
})
