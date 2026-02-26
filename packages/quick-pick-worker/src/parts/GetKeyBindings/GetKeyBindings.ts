import { WhenExpression } from '@lvce-editor/constants'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as KeyCode from '../KeyCode/KeyCode.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      args: ['QuickPick'],
      command: 'Viewlet.closeWidget',
      key: KeyCode.Escape,
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      command: 'QuickPick.focusPrevious',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      command: 'QuickPick.focusNext',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      command: 'QuickPick.focusFirst',
      key: KeyCode.PageUp,
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      command: 'QuickPick.focusLast',
      key: KeyCode.PageDown,
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      command: 'QuickPick.selectCurrentIndex',
      key: KeyCode.Enter,
      when: WhenExpression.FocusQuickPickInput,
    },
  ]
}
