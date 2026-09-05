import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-line-empty-document'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/edge.txt`, '')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/edge.txt`)
  await QuickPick.open()
  const label = Locator('.QuickPickItemLabel')
  const quickPick = Locator('#QuickPick')

  // act
  await QuickPick.setValue(':1')

  // assert
  await expect(label).toHaveText("Press 'Enter' to go to line 0 column 0")

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([0, 0, 0, 0]))
  await expect(quickPick).toBeHidden()
}
