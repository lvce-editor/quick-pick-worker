import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-navigation-round-trip'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(1)

  // act
  await QuickPick.focusNext()
  await QuickPick.focusPrevious()

  // assert
  await expect(Locator('.QuickPickItemActive')).toHaveText('Layout: Reset View Locations')
  await expect(Locator('.QuickPickItemActive')).toHaveAttribute('aria-posinset', '2')
  await expect(Locator('#QuickPickItemActive')).toHaveCount(1)
  await expect(Locator('.QuickPickItem').nth(2)).toHaveId('')
}
