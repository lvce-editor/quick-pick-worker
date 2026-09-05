import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-widen-filter-resets-selection'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout: Reset View Locations')
  await expect(Locator('.QuickPickItemActive')).toHaveText('Layout: Reset View Locations')

  // act
  await QuickPick.setValue('> Layout')

  // assert
  await expect(Locator('.QuickPickItemActive')).toHaveText('Layout: Toggle Side Bar')
  await expect(Locator('.QuickPickItemActive')).toHaveAttribute('aria-posinset', '1')
  await expect(Locator('.QuickPickItem').nth(1)).toHaveId('')
}
