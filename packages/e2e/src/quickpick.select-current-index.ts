import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.select-current-index'

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
