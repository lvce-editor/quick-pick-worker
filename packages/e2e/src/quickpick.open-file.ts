import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-file'

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, Workspace }) => {
  // arrange
  const tmpDirUri = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDirUri}/example.txt`, 'opened from quick pick')
  await Workspace.setPath(tmpDirUri)
  await QuickPick.open()

  // act
  await QuickPick.setValue('example.txt')
  const firstPick = Locator('.QuickPickItem').nth(0)
  await expect(firstPick).toBeVisible()
  await QuickPick.selectItem('example.txt')

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeHidden()
  const editorLines = Locator('.view-lines')
  await expect(editorLines).toHaveText('opened from quick pick')
}
