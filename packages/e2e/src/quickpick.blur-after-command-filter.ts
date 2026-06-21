import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.blur-after-command-filter'

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await QuickPick.open()
  await QuickPick.setValue('> Layout')

  // act
  await SideBar.open('Explorer')

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeHidden()
}
