import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.keyboard-escape'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  await QuickPick.open()
  const quickPick = Locator('#QuickPick')
  await expect(quickPick).toBeVisible()

  const quickPickInput = Locator('#QuickPick .InputBox')
  await quickPickInput.dispatchEvent('keydown', {
    bubbles: true,
    code: 'Escape',
    key: 'Escape',
  } as unknown as string)

  await expect(quickPick).toBeHidden()
}
