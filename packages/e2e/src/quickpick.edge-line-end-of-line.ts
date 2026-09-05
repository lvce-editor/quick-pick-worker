import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-line-end-of-line'

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
  await QuickPick.setValue(':2:4')

  // assert
  await expect(label).toHaveCount(1)
  await expect(label).toHaveText("Press 'Enter' to go to line 1 column 3")

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([1, 3, 1, 3]))
  await expect(quickPick).toBeHidden()
}
