import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-full-label'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive')
  const input = Locator('#QuickPick .InputBox')
  const items = Locator('.QuickPickItem')

  // act
  await QuickPick.setValue('> Help: About')

  // assert
  await expect(items).toHaveCount(1)
  await expect(activeItem).toHaveText('Help: About')
  await expect(input).toHaveValue('> Help: About')
}
