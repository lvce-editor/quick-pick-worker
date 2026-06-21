import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.handle-input-about'

export const skip = 1

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.handleInput('> About')

  // assert
  const quickPickInput = Locator('#QuickPick .InputBox')
  await expect(quickPickInput).toHaveValue('> About')
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('Help: About')
}
