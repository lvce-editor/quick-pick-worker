import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-navigation-round-trip'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const thirdItem = Locator('.QuickPickItem').nth(2)
  const activeItem = Locator('.QuickPickItemActive')
  const activeItemById = Locator('#QuickPickItemActive')
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(1)

  // act
  await QuickPick.focusNext()
  await QuickPick.focusPrevious()

  // assert
  await expect(activeItem).toHaveText('Layout: Reset View Locations')
  await expect(activeItem).toHaveAttribute('aria-posinset', '2')
  await expect(activeItemById).toHaveCount(1)
  await expect(thirdItem).toHaveId('')
}
