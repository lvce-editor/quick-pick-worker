import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.inactive-result-has-no-active-id'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')

  // assert
  const secondItem = Locator('.QuickPickItem').nth(1)
  await expect(secondItem).toHaveAttribute('id', null)
}
