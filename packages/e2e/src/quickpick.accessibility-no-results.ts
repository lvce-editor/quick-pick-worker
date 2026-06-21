import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.accessibility-no-results'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('no matching item')

  // assert
  const noResultMessage = Locator('.QuickPickStatus')
  await expect(noResultMessage).toHaveText('No Results')
  const quickPickInput = Locator('#QuickPick .InputBox')
  await expect(quickPickInput).toHaveAttribute('role', 'combobox')
}
