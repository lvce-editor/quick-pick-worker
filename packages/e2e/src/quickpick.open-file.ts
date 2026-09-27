import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-file'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  const tmpDirUri = await FileSystem.getTmpDir({ scheme: 'file' })
  const tmpDirPath = decodeURIComponent(new URL(tmpDirUri).pathname).replace(/^\/([a-z]:)/i, '$1')
  await FileSystem.mkdir(`${tmpDirUri}/src`)
  await Workspace.setPath(tmpDirPath)

  for (const relativePath of ['example.txt', 'src/Ä 100% #.txt']) {
    const fileUri = `${tmpDirUri}/${relativePath.split('/').map(encodeURIComponent).join('/')}`
    const fileContent = `opened from quick pick: ${relativePath}`
    await FileSystem.writeFile(fileUri, fileContent)

    // Verify the disk-backed fixture independently of Quick Pick.
    await Main.openUri(fileUri)
    await Editor.shouldHaveText(fileContent)
    await Main.closeActiveEditor()

    await QuickPick.open()
    const label = relativePath.slice(relativePath.lastIndexOf('/') + 1)
    await QuickPick.setValue(label)
    const firstPick = Locator('.QuickPickItem').nth(0)
    await expect(firstPick).toBeVisible()
    await QuickPick.selectItem(label)

    const quickPick = Locator('.QuickPick')
    const editorRows = Locator('.EditorRows')
    await expect(quickPick).toBeHidden()
    await expect(editorRows).toHaveText(fileContent)
    await Main.closeActiveEditor()
  }
}
