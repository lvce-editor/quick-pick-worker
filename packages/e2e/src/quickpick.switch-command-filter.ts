import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.switch-command-filter'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> About')

  // act
  await QuickPick.setValue('> Layout')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('Layout: Toggle Side Bar')
}
