import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-command-regex-metacharacters'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  const activeItem = Locator('.QuickPickItemActive')
  const input = Locator('#QuickPick .InputBox')
  const status = Locator('.QuickPickStatus')
  const items = Locator('.QuickPickItem')
  await QuickPick.setValue('> About')

  // act
  await QuickPick.setValue('> ^.*$')

  // assert
  await expect(status).toHaveText('No Results')
  await expect(items).toHaveCount(0)
  await expect(input).toHaveValue('> ^.*$')

  // act
  await QuickPick.setValue('> About')

  // assert
  await expect(status).toBeHidden()
  await expect(activeItem).toHaveText('Help: About')
}
