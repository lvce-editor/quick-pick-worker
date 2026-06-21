import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.filter-after-no-results'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> not found')
  const noResultMessage = Locator('.QuickPickStatus')
  await expect(noResultMessage).toHaveText('No Results')

  // act
  await QuickPick.setValue('> About')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('Help: About')
}
