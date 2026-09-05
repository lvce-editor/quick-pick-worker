import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-full-label'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('> Help: About')

  // assert
  await expect(Locator('.QuickPickItem')).toHaveCount(1)
  await expect(Locator('.QuickPickItemActive')).toHaveText('Help: About')
  await expect(Locator('#QuickPick .InputBox')).toHaveValue('> Help: About')
}
