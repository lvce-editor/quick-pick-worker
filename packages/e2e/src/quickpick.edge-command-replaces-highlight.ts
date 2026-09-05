import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-replaces-highlight'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> About')
  await expect(Locator('.QuickPickHighlight')).toHaveText('About')

  // act
  await QuickPick.setValue('> Help')

  // assert
  await expect(Locator('.QuickPickItem')).toHaveCount(1)
  await expect(Locator('.QuickPickItemActive')).toHaveText('Help: About')
  await expect(Locator('.QuickPickHighlight')).toHaveText('Help')
}
