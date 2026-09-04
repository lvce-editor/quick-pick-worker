import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.execute-command-layout-toggle-panel'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await QuickPick.executeCommand('>Layout: Toggle Panel')

  // act
  await QuickPick.selectIndex(0)

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeHidden()
}
