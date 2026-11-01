import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-visible'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // act
  await QuickPick.open()

  // assert
  const quickPick = Locator('#QuickPick')
  await expect(quickPick).toBeVisible()
}
