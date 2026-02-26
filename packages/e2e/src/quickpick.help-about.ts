import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.help-about'

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await QuickPick.open()
  await QuickPick.setValue('> Help: About')

  // act
  await QuickPick.selectItem('Help: About')

  // assert
  const about = Locator('.About')
  await expect(about).toBeVisible()
}
