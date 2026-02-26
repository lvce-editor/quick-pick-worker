import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.focus-next'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(0)

  // act
  await QuickPick.focusNext()

  // assert
  const activeItem = Locator('.QuickPickItemActive')
  await expect(activeItem).toHaveText('Layout: Toggle Panel')
}
