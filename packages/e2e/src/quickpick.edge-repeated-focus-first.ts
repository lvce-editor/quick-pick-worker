import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-repeated-focus-first'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const secondItem = Locator('.QuickPickItem[role="option"]').nth(1)
  const activeItem = Locator('.QuickPickItemActive[role="option"]')
  const activeItemById = Locator('#QuickPickItemActive')
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(1)

  // act
  await QuickPick.focusFirst()
  await QuickPick.focusFirst()

  // assert
  await expect(activeItem).toHaveText('Layout: Toggle Side Bar')
  await expect(activeItemById).toHaveCount(1)
  await expect(secondItem).toHaveId('')
}
