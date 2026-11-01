import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-filter-lowercase'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> layout')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('Layout: Toggle Side Bar')
}
