import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-filter-highlight'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> Layout')

  // assert
  const highlight = Locator('.QuickPickItem').nth(0).locator('.QuickPickHighlight')
  await expect(highlight).toHaveText('Layout')
}
