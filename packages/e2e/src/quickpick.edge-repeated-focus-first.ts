import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-repeated-focus-first'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(1)

  // act
  await QuickPick.focusFirst()
  await QuickPick.focusFirst()

  // assert
  await expect(Locator('.QuickPickItemActive')).toHaveText('Layout: Toggle Side Bar')
  await expect(Locator('#QuickPickItemActive')).toHaveCount(1)
  await expect(Locator('.QuickPickItem').nth(1)).toHaveId('')
}
