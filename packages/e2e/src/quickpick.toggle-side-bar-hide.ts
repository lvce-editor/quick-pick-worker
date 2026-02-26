import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.toggle-side-bar-hide'

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await SideBar.open('Explorer')
  await QuickPick.executeCommand('>Layout: Toggle Side Bar')

  // act
  await QuickPick.selectIndex(0)

  // assert
  const sideBar = Locator('.SideBar')
  await expect(sideBar).toBeHidden()
}
