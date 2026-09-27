import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-file'

export const test: Test = async ({ Editor, FileSystem, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/example.txt`, 'opened from quick pick')
  await Workspace.setPath(tmpDir)
  await QuickPick.open()

  // act
  await QuickPick.setValue('example.txt')
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveText('opened from quick pick')
}
