import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-line-explicit-column'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  const label = Locator('.QuickPickItemLabel')
  const expectQuickPickLabel = async (text: string): Promise<void> => {
    await expect(label).toHaveCount(1)
    await expect(label).toHaveText(text)
  }

  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/edge.txt`, Array.from({ length: 15 }).fill('abcdefghijklmnopqrst').join('\n'))
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/edge.txt`)
  await QuickPick.open()
  const quickPick = Locator('#QuickPick')

  // act
  await QuickPick.setValue(':15:20')

  // assert
  await expectQuickPickLabel("Press 'Enter' to go to line 15 column 20")

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([14, 19, 14, 19]))
  await expect(quickPick).toBeHidden()
}
