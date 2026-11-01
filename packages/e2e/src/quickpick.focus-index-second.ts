import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.focus-index-second'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')

  // act
  await QuickPick.focusIndex(1)

  // assert
  const activeItem = Locator('.QuickPickItemActive')
  await expect(activeItem).toHaveText('Layout: Reset View Locations')
}
