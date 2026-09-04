import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.go-to-line-third-row'

export const test: Test = async ({ Editor, FileSystem, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc\ndef\nghi')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/a.txt`)
  await QuickPick.open()
  await QuickPick.setValue(':3')

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([2, 0, 2, 0]))
}
