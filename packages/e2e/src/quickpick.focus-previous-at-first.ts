import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.focus-previous-at-first'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(0)

  // act
  await QuickPick.focusPrevious()

  // assert
  const activeItem = Locator('.QuickPickItemActive')
  await expect(activeItem).toHaveText('Layout: Toggle Side Bar')
}
