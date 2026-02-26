import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.go-to-column-second-row'

export const skip = 1

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc\ndef')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/a.txt`)
  await QuickPick.open()
  await QuickPick.setValue('::7')
  const label = Locator('.QuickPickItemLabel')
  await expect(label).toBeVisible()
  await expect(label).toHaveText(`Press 'Enter' to go to line 1 column 3`)

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([1, 3, 1, 3]))
}
