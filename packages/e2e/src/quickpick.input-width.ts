import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.input-width'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  const inputWrapper = Locator('#QuickPick .QuickPickInputWrapper')
  const input = Locator('#QuickPick .InputBox')

  // assert
  await expect(inputWrapper).toHaveCSS('width', '586px')
  await expect(input).toHaveCSS('width', '586px')
}
