import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.input-value'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> Layout')

  // assert
  const quickPickInput = Locator('#QuickPick .InputBox')
  await expect(quickPickInput).toHaveValue('> Layout')
}
