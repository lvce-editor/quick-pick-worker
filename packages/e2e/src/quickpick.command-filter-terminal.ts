import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-filter-terminal'

export const skip = 1

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> Terminal')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('Focus: Terminal')
}
