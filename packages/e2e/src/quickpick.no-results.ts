import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.no-results'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> command that does not exist')

  // assert
  const noResultMessage = Locator('.QuickPickStatus')
  await expect(noResultMessage).toBeVisible()
  await expect(noResultMessage).toHaveText('No Results')
}
