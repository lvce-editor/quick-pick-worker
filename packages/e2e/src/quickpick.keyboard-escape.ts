import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.keyboard-escape'

export const test: Test = async ({ expect, KeyBoard, Locator, QuickPick }) => {
  await QuickPick.open()
  const quickPick = Locator('#QuickPick')
  await expect(quickPick).toBeVisible()

  await KeyBoard.press('Escape')

  await expect(quickPick).toBeHidden()
}
