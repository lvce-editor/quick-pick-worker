import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.select-all-occurrences'

export const test: Test = async ({ Editor, FileSystem, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc\ndef\nabc\n')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/a.txt`)
  await Editor.setSelections(new Uint32Array([0, 3, 0, 3]))
  await QuickPick.open()
  await QuickPick.setValue('> Select All Occurrences')

  // act
  await QuickPick.selectItem('Editor: Select All Occurrences')

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([0, 0, 0, 3, 2, 0, 2, 3]))
}
