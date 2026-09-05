import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-character-unicode-offset'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/edge.txt`, 'a😀b\nc')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/edge.txt`)
  await QuickPick.open()
  const label = Locator('.QuickPickItemLabel')
  const quickPick = Locator('#QuickPick')

  // act
  // eslint-disable-next-line sonarjs/no-hardcoded-ip
  await QuickPick.setValue('::3')

  // assert
  await expect(label).toHaveText("Press 'Enter' to go to line 0 column 3")

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([0, 3, 0, 3]))
  await expect(quickPick).toBeHidden()
}
