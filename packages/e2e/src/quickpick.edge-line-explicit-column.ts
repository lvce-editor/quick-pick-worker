import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-line-explicit-column'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/edge.txt`, 'abc\ndef')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/edge.txt`)
  await QuickPick.open()
  const label = Locator('.QuickPickItemLabel')
  const quickPick = Locator('#QuickPick')

  // act
  await QuickPick.setValue(':2:2')

  // assert
  await expect(label).toHaveText("Press 'Enter' to go to line 1 column 1")

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([1, 1, 1, 1]))
  await expect(quickPick).toBeHidden()
}
