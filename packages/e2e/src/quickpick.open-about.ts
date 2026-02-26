import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-about'

export const skip = 1

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange

  // act
  await QuickPick.executeCommand('About.show')

  // assert
  const dialogContent = Locator('.DialogContent')
  await expect(dialogContent).toBeVisible()
  const infoIcon = dialogContent.locator('.DialogInfoIcon')
  await expect(infoIcon).toBeVisible()
}
