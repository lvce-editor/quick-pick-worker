import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.execute-command-about-dialog'

export const skip = 1

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.executeCommand('>Help: About')

  // act
  await QuickPick.selectIndex(0)

  // assert
  const dialogContent = Locator('.DialogContent')
  await expect(dialogContent).toBeVisible()
  const infoIcon = dialogContent.locator('.DialogInfoIcon')
  await expect(infoIcon).toBeVisible()
}
