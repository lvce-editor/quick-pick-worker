import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.focus-index-layout-third'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')

  // act
  await QuickPick.focusIndex(2)

  // assert
  const activeItem = Locator('.QuickPickItemActive')
  await expect(activeItem).toHaveText('Layout: Toggle Activity Bar')
}
