import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.recover-after-no-results'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> definitely-not-a-command')

  // act
  await QuickPick.setValue('> Layout')

  // assert
  const status = Locator('.QuickPickStatus')
  await expect(status).toBeHidden()
  const activeItem = Locator('.QuickPickItemActive')
  await expect(activeItem).toHaveText('Layout: Toggle Side Bar')
}
