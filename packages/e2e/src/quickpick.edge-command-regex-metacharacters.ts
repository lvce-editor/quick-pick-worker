import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-regex-metacharacters'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> About')

  // act
  await QuickPick.setValue('> ^.*$')

  // assert
  await expect(Locator('.QuickPickStatus')).toHaveText('No Results')
  await expect(Locator('.QuickPickItem')).toHaveCount(0)
  await expect(Locator('#QuickPick .InputBox')).toHaveValue('> ^.*$')

  // act
  await QuickPick.setValue('> About')

  // assert
  await expect(Locator('.QuickPickStatus')).toBeHidden()
  await expect(Locator('.QuickPickItemActive')).toHaveText('Help: About')
}
