import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.no-results-hides-options'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> definitely-not-a-command')

  // assert
  const options = Locator('.QuickPickItem[role="option"]')
  await expect(options).toHaveCount(0)
}
