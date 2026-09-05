import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-line-unsafe-line'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/edge.txt`, 'abc\ndef\nghi')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/edge.txt`)
  await QuickPick.open()
  await QuickPick.setValue(':2:2')
  await expect(Locator('.QuickPickItemLabel')).toHaveText("Press 'Enter' to go to line 1 column 1")

  // act
  await QuickPick.setValue(':9007199254740992')

  // assert
  await expect(Locator('.QuickPickItemLabel')).toHaveText('Type a line number to go to (from 1 to 3)')
  await expect(Locator('.QuickPickItem')).toHaveCount(1)

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([0, 0, 0, 0]))
  await expect(Locator('#QuickPick')).toBeHidden()
}
