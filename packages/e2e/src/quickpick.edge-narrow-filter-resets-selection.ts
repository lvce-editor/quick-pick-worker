import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-narrow-filter-resets-selection'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(2)
  await expect(Locator('.QuickPickItemActive')).toHaveAttribute('aria-posinset', '3')

  // act
  await QuickPick.setValue('> Layout: Reset View Locations')

  // assert
  await expect(Locator('.QuickPickItem')).toHaveCount(1)
  await expect(Locator('.QuickPickItemActive')).toHaveText('Layout: Reset View Locations')
  await expect(Locator('.QuickPickItemActive')).toHaveAttribute('aria-posinset', '1')
  await expect(Locator('.QuickPickItemActive')).toHaveAttribute('aria-setsize', '1')
}
