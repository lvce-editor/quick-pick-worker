import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-unicode-no-results'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive[role="option"]')
  const input = Locator('#QuickPick .InputBox')
  const status = Locator('.QuickPickStatus')
  const items = Locator('.QuickPickItem[role="option"]')
  await QuickPick.setValue('> About')

  // act
  await QuickPick.setValue('> 🧪不存在')

  // assert
  await expect(status).toHaveText('No Results')
  await expect(items).toHaveCount(0)
  await expect(input).toHaveValue('> 🧪不存在')

  // act
  await QuickPick.setValue('> About')

  // assert
  await expect(status).toBeHidden()
  await expect(activeItem).toHaveText('Help: About')
}
