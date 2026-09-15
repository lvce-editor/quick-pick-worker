import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-filter-settings-ui'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('>settui')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('Preferences: Open Settings Ui')
  await expect(firstItem).toHaveId('QuickPickItemActive')
}
