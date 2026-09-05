import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-replaces-highlight'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive')
  const highlight = Locator('.QuickPickHighlight')
  const items = Locator('.QuickPickItem')
  await QuickPick.setValue('> About')
  await expect(highlight).toHaveText('About')

  // act
  await QuickPick.setValue('> Help')

  // assert
  await expect(items).toHaveCount(1)
  await expect(activeItem).toHaveText('Help: About')
  await expect(highlight).toHaveText('Help')
}
