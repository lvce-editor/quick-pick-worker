import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.first-result-active'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> Layout')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveId('QuickPickItemActive')
}
