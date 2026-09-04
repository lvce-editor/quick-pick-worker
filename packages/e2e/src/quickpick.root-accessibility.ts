import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.root-accessibility'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // assert
  const quickPick = Locator('#QuickPick')
  await expect(quickPick).toHaveAttribute('aria-label', 'Quick Open')
}
