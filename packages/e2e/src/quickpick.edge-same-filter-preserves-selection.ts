import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-same-filter-preserves-selection'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(1)
  await expect(Locator('.QuickPickItemActive')).toHaveText('Layout: Reset View Locations')

  // act
  await QuickPick.setValue('> Layout')

  // assert
  await expect(Locator('.QuickPickItemActive')).toHaveText('Layout: Reset View Locations')
  await expect(Locator('#QuickPickItemActive')).toHaveCount(1)
}
