import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-replaces-highlight'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive[role="option"]')
  const firstItem = Locator('.QuickPickItem[role="option"]').nth(0)
  const highlight = firstItem.locator('.QuickPickHighlight')
  await QuickPick.setValue('> About')
  await expect(highlight).toHaveCount(1)
  await expect(highlight).toHaveText('About')

  // act
  await QuickPick.setValue('> Help')

  // assert
  await expect(activeItem).toHaveText('Help: About')
  await expect(highlight).toHaveCount(1)
  await expect(highlight).toHaveText('Help')
}
