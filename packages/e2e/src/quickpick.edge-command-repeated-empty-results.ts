import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-repeated-empty-results'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive')
  const status = Locator('.QuickPickStatus')
  const items = Locator('.QuickPickItem')
  await QuickPick.setValue('> no-such-command-111')
  await expect(status).toHaveText('No Results')

  // act
  await QuickPick.setValue('> no-such-command-222')

  // assert
  await expect(status).toHaveCount(1)
  await expect(status).toHaveText('No Results')
  await expect(items).toHaveCount(0)
  await expect(activeItem).toHaveCount(0)
}
