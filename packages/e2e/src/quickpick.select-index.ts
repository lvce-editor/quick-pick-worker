import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.select-index'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> About')

  // act
  await QuickPick.selectIndex(0)

  // assert
  const dialogContent = Locator('.DialogContent')
  await expect(dialogContent).toBeVisible()
  const infoIcon = dialogContent.locator('.DialogInfoIcon')
  await expect(infoIcon).toBeVisible()
}
