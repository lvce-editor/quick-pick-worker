import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.list-accessibility'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')

  // assert
  const list = Locator('#QuickPickItems')
  await expect(list).toHaveAttribute('role', 'listbox')
  await expect(list).toHaveAttribute('aria-activedescendant', 'QuickPickItemActive')
}
