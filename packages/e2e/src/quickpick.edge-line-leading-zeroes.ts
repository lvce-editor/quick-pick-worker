import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-line-leading-zeroes'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/edge.txt`, 'abc\ndef')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/edge.txt`)
  await QuickPick.open()

  // act
  await QuickPick.setValue(':002:003')

  // assert
  await expect(Locator('.QuickPickItemLabel')).toHaveText("Press 'Enter' to go to line 1 column 2")

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([1, 2, 1, 2]))
  await expect(Locator('#QuickPick')).toBeHidden()
}
