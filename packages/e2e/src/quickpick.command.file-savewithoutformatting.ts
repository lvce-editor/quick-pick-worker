import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command.file-savewithoutformatting'

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main, QuickPick, Settings, Workspace }) => {
  await Extension.addWebExtension(import.meta.resolve('../extension'))
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/save.quick-pick-formatting`
  await FileSystem.writeFile(filePath, 'const value=0')
  await Workspace.setPath(tmpDir)
  await Settings.update({ 'editor.formatOnSave': true })
  await Main.openUri(filePath)
  const formatOnSave = await Command.execute('Preferences.get', 'editor.formatOnSave')
  if (formatOnSave !== true) {
    throw new Error(`Expected formatOnSave to be enabled, got ${formatOnSave}`)
  }

  await QuickPick.open()
  await QuickPick.setValue('>Change Language Mode')
  await QuickPick.selectItem('Change Language Mode', {
    waitUntil: 'quickPick',
  })
  await QuickPick.handleInput('quick-pick-formatting')
  await QuickPick.selectItem('quick-pick-formatting')

  await Editor.setText('const value=1')
  await Editor.format()
  await Editor.shouldHaveText('const value = 1')
  await Editor.setText('const value=1')
  await Command.execute('Editor.save')
  await FileSystem.shouldHaveFile(filePath, 'const value = 1')
  await Editor.setText('const value=1')

  await QuickPick.open()
  await QuickPick.setValue('>File: Save without Formatting')
  const item = Locator('.QuickPickItem').nth(0)
  await expect(item).toHaveText('File: Save without Formatting')

  await QuickPick.selectIndex(0)
  await FileSystem.shouldHaveFile(filePath, 'const value=1')

  await Editor.setText('const value=2')
  await Main.save()
  await FileSystem.shouldHaveFile(filePath, 'const value = 2')
  await Settings.update({ 'editor.formatOnSave': false })
}
