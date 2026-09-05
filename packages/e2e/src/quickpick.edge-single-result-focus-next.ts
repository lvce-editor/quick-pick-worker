import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-single-result-focus-next'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> About')
  await expect(Locator('.QuickPickItem')).toHaveCount(1)

  // act
  await QuickPick.focusNext()
  await QuickPick.focusNext()

  // assert
  await expect(Locator('.QuickPickItemActive')).toHaveText('Help: About')
  await expect(Locator('#QuickPickItemActive')).toHaveCount(1)
  await expect(Locator('.QuickPickItemActive')).toHaveAttribute('aria-posinset', '1')
}
