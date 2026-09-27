import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-file'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDirUri = await FileSystem.getTmpDir({ scheme: 'file' })
  const tmpDirPath = decodeURIComponent(new URL(tmpDirUri).pathname).replace(/^\/([a-z]:)/i, '$1')
  const fileUri = `${tmpDirUri}/example.txt`
  const fileContent = 'opened from quick pick'
  await FileSystem.writeFile(fileUri, fileContent)
  await Workspace.setPath(tmpDirPath)

  // Verify the disk-backed file fixture opens before exercising Quick Pick.
  await Main.openUri(fileUri)
  await Editor.shouldHaveText(fileContent)
  await Main.closeActiveEditor()

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
  await expect(editorLines).toHaveText(fileContent)
}
