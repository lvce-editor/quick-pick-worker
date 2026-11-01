import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.input-focused'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // act
  await QuickPick.open()

  // assert
  const input = Locator('#QuickPick .InputBox')
  await expect(input).toBeFocused()
}
