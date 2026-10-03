import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command.editor-change-language-mode-icons'

export const test: Test = async ({ Command, expect, Extension, FileSystem, IconTheme, Locator, Main, QuickPick, Workspace }) => {
  await Extension.addWebExtension(import.meta.resolve('../extension'))
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: '<root>value</root>', uri: `${tmpDir}/xml.txt` },
    { content: 'name: value', uri: `${tmpDir}/yaml.txt` },
  ])
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/xml.txt`)
  await IconTheme.setIconTheme('test-scroll-icons')

  await QuickPick.open()
  await QuickPick.setValue('>Change Language Mode')
  await QuickPick.selectItem('Change Language Mode', {
    waitUntil: 'quickPick',
  })

  await QuickPick.handleInput('xml')
  const firstItem = Locator('.QuickPickItem').nth(0)
  const firstIcon = Locator('.QuickPickItem .FileIcon').nth(0)
  await expect(firstItem).toHaveText('xml')
  const xmlIcon = await Command.execute('IconTheme.getFileIcon', { name: '.project' })
  await expect(firstIcon).toHaveAttribute('src', xmlIcon)
  await QuickPick.selectItem('xml')
  const xmlToken = Locator('.Token.TagName', { hasText: 'root' }).nth(0)
  await expect(xmlToken).toBeVisible()

  await Main.openUri(`${tmpDir}/yaml.txt`)
  await QuickPick.open()
  await QuickPick.setValue('>Change Language Mode')
  await QuickPick.selectItem('Change Language Mode', {
    waitUntil: 'quickPick',
  })
  await QuickPick.handleInput('yaml')

  const yamlItem = Locator('.QuickPickItem').nth(0)
  const yamlIconElement = Locator('.QuickPickItem .FileIcon').nth(0)
  await expect(yamlItem).toHaveText('yaml')
  const yamlIcon = await Command.execute('IconTheme.getFileIcon', { name: '.travis.yml.off' })
  await expect(yamlIconElement).toHaveAttribute('src', yamlIcon)
  await QuickPick.selectItem('yaml')
  const yamlToken = Locator('.Token.YamlPropertyName', { hasText: 'name' })
  await expect(yamlToken).toBeVisible()
}
