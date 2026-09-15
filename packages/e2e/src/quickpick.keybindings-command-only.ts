import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.keybindings-command-only'

export const test: Test = async ({ Command, expect, Locator, QuickPick, Settings }) => {
  try {
    await Settings.update({ 'quickPick.showKeyBindings': true })
    const keyBinding = Locator('.QuickPickKeyBinding')
    await QuickPick.open()
    await QuickPick.setValue('>SSH: Connect')
    await expect(keyBinding).toHaveText('CtrlShiftU')
    await QuickPick.setValue('')
    await expect(keyBinding).toHaveCount(0)
    await QuickPick.setValue('>SSH: Connect')
    await expect(keyBinding).toHaveText('CtrlShiftU')
  } finally {
    await Command.execute('QuickPick.close')
    await Settings.update({ 'quickPick.showKeyBindings': false })
  }
}
