import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.select-file'

export const skip = 1

export const test: Test = async ({ FileSystem, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc')
  await Workspace.setPath(tmpDir)
  await QuickPick.open()
  await QuickPick.setValue('a.txt')

  // act
  await QuickPick.selectItem('a.txt')

  // assert

  // TODO
}
