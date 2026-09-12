import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-character-empty-line'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  const label = Locator('.QuickPickItemLabel')
  const expectQuickPickLabel = async (text: string): Promise<void> => {
    await expect(label).toHaveCount(1)
    await expect(label).toHaveText(text)
  }

  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/edge.txt`, 'a\n\nb')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/edge.txt`)
  await QuickPick.open()
  const quickPick = Locator('#QuickPick')

  // act
  // eslint-disable-next-line sonarjs/no-hardcoded-ip
  await QuickPick.setValue('::2')

  // assert
  await expectQuickPickLabel("Press 'Enter' to go to line 2 column 1")

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([1, 0, 1, 0]))
  await expect(quickPick).toBeHidden()
}
