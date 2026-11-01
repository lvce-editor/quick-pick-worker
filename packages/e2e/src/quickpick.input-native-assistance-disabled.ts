import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.input-native-assistance-disabled'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // assert
  const input = Locator('#QuickPick .InputBox')
  await expect(input).toHaveAttribute('autocomplete', 'off')
  await expect(input).toHaveAttribute('autocapitalize', 'off')
  await expect(input).toHaveAttribute('spellcheck', 'false')
}
