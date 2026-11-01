import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-filter-about'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> About')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('Help: About')
}
