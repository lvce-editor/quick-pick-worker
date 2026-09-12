import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-keybindings-disabled'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  const keyBinding = Locator('.QuickPickKeyBinding')
  const item = Locator('.QuickPickItem')
  await QuickPick.open()
  await QuickPick.setValue('>SSH: Connect')
  await expect(item).toHaveText('SSH: Connect')
  await expect(keyBinding).toHaveCount(0)
}
