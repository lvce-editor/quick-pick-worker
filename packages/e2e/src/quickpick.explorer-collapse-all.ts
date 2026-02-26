import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.explorer-collapse-all'

export const test: Test = async ({ expect, Explorer, FileSystem, Locator, QuickPick, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/a`)
  await FileSystem.writeFile(`${tmpDir}/a/1.txt`, '')
  await FileSystem.writeFile(`${tmpDir}/a/2.txt`, '')
  await FileSystem.mkdir(`${tmpDir}/b`)
  await Workspace.setPath(tmpDir)
  await Explorer.expandRecursively()
  await SideBar.open('Explorer')
  await QuickPick.executeCommand('>Explorer: Collapse All')

  // act
  await QuickPick.selectIndex(0)

  // assert
  const treeItemA = Locator('.TreeItem[aria-label="a"]')
  await expect(treeItemA).toHaveAttribute('aria-expanded', 'false')
}
