import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-narrow-filter-resets-selection'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive')
  const items = Locator('.QuickPickItem')
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(2)
  await expect(activeItem).toHaveAttribute('aria-posinset', '3')

  // act
  await QuickPick.setValue('> Layout: Reset View Locations')

  // assert
  await expect(items).toHaveCount(1)
  await expect(activeItem).toHaveText('Layout: Reset View Locations')
  await expect(activeItem).toHaveAttribute('aria-posinset', '1')
  await expect(activeItem).toHaveAttribute('aria-setsize', '1')
}
