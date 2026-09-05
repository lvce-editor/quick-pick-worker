import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-repeated-recovery'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive')
  const activeItemById = Locator('#QuickPickItemActive')
  const status = Locator('.QuickPickStatus')
  const items = Locator('.QuickPickItem')
  // act
  for (let i = 0; i < 3; i++) {
    await QuickPick.setValue('> no-such-command-333')
    await expect(status).toHaveText('No Results')
    await expect(items).toHaveCount(0)
    await QuickPick.setValue('> About')
    await expect(status).toBeHidden()
    await expect(activeItem).toHaveText('Help: About')
  }

  // assert
  await expect(items).toHaveCount(1)
  await expect(activeItemById).toHaveCount(1)
}
