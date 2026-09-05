import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-character-empty-line'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/edge.txt`, 'a\n\nb')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/edge.txt`)
  await QuickPick.open()

  // act
  // eslint-disable-next-line sonarjs/no-hardcoded-ip
  await QuickPick.setValue('::2')

  // assert
  await expect(Locator('.QuickPickItemLabel')).toHaveText("Press 'Enter' to go to line 1 column 0")

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([1, 0, 1, 0]))
  await expect(Locator('#QuickPick')).toBeHidden()
}
