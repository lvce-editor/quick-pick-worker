import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.help-about'

// TODO re-enable when About.showAbout opens the About widget in the current server.
export const skip = 1

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
