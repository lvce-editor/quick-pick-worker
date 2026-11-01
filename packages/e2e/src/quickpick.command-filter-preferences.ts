import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-filter-preferences'

export const skip = 1

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> Preferences')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('Preferences: Color Theme')
}
