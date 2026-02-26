import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.select-all'

export const skip = 1

export const test: Test = async ({ Editor, FileSystem, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc\ndef')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/a.txt`)
  await QuickPick.open()
  await QuickPick.setValue('> Select All')

  // act

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([1, 3, 1, 3]))
}
