import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.select-down'

export const test: Test = async ({ Editor, FileSystem, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc\ndef')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/a.txt`)
  await QuickPick.open()
  await QuickPick.setValue('> Select Down')
  await Editor.setCursor(0, 0)

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([0, 0, 1, 0]))
}
