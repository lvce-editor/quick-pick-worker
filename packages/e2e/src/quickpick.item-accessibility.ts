import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.item-accessibility'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveAttribute('role', 'option')
  await expect(firstItem).toHaveAttribute('aria-posinset', '1')
}
