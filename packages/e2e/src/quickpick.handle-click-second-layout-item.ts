import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.handle-click-second-layout-item'

export const skip = 1

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')

  // act
  await QuickPick.handleClickAt(0, 112)

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeHidden()
}
