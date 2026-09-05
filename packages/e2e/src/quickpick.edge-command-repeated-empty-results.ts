import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-repeated-empty-results'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> no-such-command-111')
  await expect(Locator('.QuickPickStatus')).toHaveText('No Results')

  // act
  await QuickPick.setValue('> no-such-command-222')

  // assert
  await expect(Locator('.QuickPickStatus')).toHaveCount(1)
  await expect(Locator('.QuickPickStatus')).toHaveText('No Results')
  await expect(Locator('.QuickPickItem')).toHaveCount(0)
  await expect(Locator('.QuickPickItemActive')).toHaveCount(0)
}
