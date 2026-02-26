import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command.developer-measurelatencybetweenextensionhostandsharedprocess'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await QuickPick.executeCommand('>Developer: Measure Latency Between Extension Host and Shared Process')

  // act
  await QuickPick.selectIndex(0)

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeHidden()
}
