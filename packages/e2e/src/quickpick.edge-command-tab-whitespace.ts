import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-tab-whitespace'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive[role="option"]')
  const input = Locator('#QuickPick .InputBox')
  const items = Locator('.QuickPickItem[role="option"]')

  // act
  await QuickPick.setValue('>\tHelp: About\t')

  // assert
  await expect(items).toHaveCount(1)
  await expect(activeItem).toHaveText('Help: About')
  await expect(input).toHaveValue('>\tHelp: About\t')
}
