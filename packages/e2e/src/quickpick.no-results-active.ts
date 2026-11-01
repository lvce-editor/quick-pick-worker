import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.no-results-active'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> definitely-not-a-command')

  // assert
  const status = Locator('.QuickPickStatus.QuickPickItemActive')
  await expect(status).toBeVisible()
  await expect(status).toHaveText('No Results')
}
