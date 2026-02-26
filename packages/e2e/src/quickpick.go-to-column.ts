import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.go-to-column'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc\ndef')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/a.txt`)
  await QuickPick.open()
  await QuickPick.setValue('::2')
  const label = Locator('.QuickPickItemLabel')
  await expect(label).toBeVisible()
  await expect(label).toHaveText(`Press 'Enter' to go to line 0 column 2`)

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([0, 2, 0, 2]))
}
