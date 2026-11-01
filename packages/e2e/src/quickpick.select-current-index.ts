import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.select-current-index'

// TODO re-enable when About.showAbout opens the About widget in the current server.
export const skip = 1

export const test: Test = async ({ Command, expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> About')

  // act
  await Command.execute('QuickPick.selectCurrentIndex')

  // assert
  const dialogContent = Locator('.DialogContent')
  await expect(dialogContent).toBeVisible()
  const infoIcon = dialogContent.locator('.DialogInfoIcon')
  await expect(infoIcon).toBeVisible()
}
