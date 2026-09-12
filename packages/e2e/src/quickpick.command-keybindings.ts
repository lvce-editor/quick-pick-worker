import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-keybindings'

export const test: Test = async ({ Command, expect, FileSystem, Locator, QuickPick, Settings }) => {
  await Settings.update({ 'quickPick.showKeyBindings': true })
  await FileSystem.writeFile('app://keybindings.json', JSON.stringify([{ command: 'Preferences.openUserKeyBindings', key: 'Ctrl+Shift+Y' }]))
  const keyBinding = Locator('.QuickPickKeyBinding')
  const firstKeyBinding = keyBinding.first()
  await QuickPick.open()
  await QuickPick.setValue('>')
  await expect(firstKeyBinding).toBeVisible()
  await QuickPick.setValue('>SSH: Connect')
  await expect(keyBinding).toHaveText('CtrlShiftU')
  await QuickPick.setValue('>')
  await QuickPick.setValue('>Preferences: Open User Key Bindings')
  await expect(keyBinding).toHaveText('CtrlShiftY')
  await Command.execute('QuickPick.close')
}
