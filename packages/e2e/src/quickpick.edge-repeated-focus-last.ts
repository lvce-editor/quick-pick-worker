import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-repeated-focus-last'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')
  await QuickPick.focusIndex(1)

  // act
  await QuickPick.focusLast()
  await QuickPick.focusLast()

  // assert
  await expect(Locator('.QuickPickItemActive')).toHaveText('Layout: Show E2E Tests')
  await expect(Locator('#QuickPickItemActive')).toHaveCount(1)
  await expect(Locator('.QuickPickItem').nth(1)).toHaveId('')
}
