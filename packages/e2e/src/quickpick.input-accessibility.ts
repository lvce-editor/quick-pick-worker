import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.input-accessibility'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // assert
  const input = Locator('#QuickPick .InputBox')
  await expect(input).toHaveAttribute('role', 'combobox')
  await expect(input).toHaveAttribute('aria-autocomplete', 'list')
  await expect(input).toHaveAttribute('aria-expanded', 'true')
}
