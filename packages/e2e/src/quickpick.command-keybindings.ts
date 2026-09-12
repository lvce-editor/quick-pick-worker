import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-keybindings'

export const test: Test = async ({ Command, expect, FileSystem, Locator, QuickPick, Settings }) => {
  let previousKeyBindings = '[]'
  try {
    previousKeyBindings = await FileSystem.readFile('app://keybindings.json')
  } catch {
    // The user keybindings file need not exist yet.
  }
  try {
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
  } finally {
    await Command.execute('QuickPick.close')
    await Settings.update({ 'quickPick.showKeyBindings': false })
    await FileSystem.writeFile('app://keybindings.json', previousKeyBindings)
  }
}
