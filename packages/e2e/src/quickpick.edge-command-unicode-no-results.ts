import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-unicode-no-results'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> About')

  // act
  await QuickPick.setValue('> 🧪不存在')

  // assert
  await expect(Locator('.QuickPickStatus')).toHaveText('No Results')
  await expect(Locator('.QuickPickItem')).toHaveCount(0)
  await expect(Locator('#QuickPick .InputBox')).toHaveValue('> 🧪不存在')

  // act
  await QuickPick.setValue('> About')

  // assert
  await expect(Locator('.QuickPickStatus')).toBeHidden()
  await expect(Locator('.QuickPickItemActive')).toHaveText('Help: About')
}
