import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-single-result-focus-previous'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive[role="option"]')
  const activeItemById = Locator('#QuickPickItemActive')
  const items = Locator('.QuickPickItem[role="option"]')
  await QuickPick.setValue('> Help: About')
  await expect(items).toHaveCount(1)

  // act
  await QuickPick.focusPrevious()
  await QuickPick.focusPrevious()

  // assert
  await expect(activeItem).toHaveText('Help: About')
  await expect(activeItemById).toHaveCount(1)
  await expect(activeItem).toHaveAttribute('aria-posinset', '1')
}
