import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-repeated-recovery'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  // act
  for (let i = 0; i < 3; i++) {
    await QuickPick.setValue('> no-such-command-333')
    await expect(Locator('.QuickPickStatus')).toHaveText('No Results')
    await expect(Locator('.QuickPickItem')).toHaveCount(0)
    await QuickPick.setValue('> About')
    await expect(Locator('.QuickPickStatus')).toBeHidden()
    await expect(Locator('.QuickPickItemActive')).toHaveText('Help: About')
  }

  // assert
  await expect(Locator('.QuickPickItem')).toHaveCount(1)
  await expect(Locator('#QuickPickItemActive')).toHaveCount(1)
}
