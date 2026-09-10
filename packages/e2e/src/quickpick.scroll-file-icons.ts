import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.scroll-file-icons'

export const test: Test = async ({ Command, expect, FileSystem, IconTheme, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const files = Array.from({ length: 25 }, (_, index) => `${String(index).padStart(2, '0')}.${index % 2 ? 'json' : 'txt'}`)
  await FileSystem.setFiles(files.map((file) => ({ content: '', uri: `${tmpDir}/${file}` })))
  await Workspace.setPath(tmpDir)
  await IconTheme.setIconTheme('test-scroll-icons')
  await Command.execute('KeyBindings.handleKeyBinding', (1 << 11) | 44)
  const firstLabel = Locator('.QuickPickItemLabel').nth(0)
  const firstIcon = Locator('.QuickPickItem .FileIcon').nth(0)
  await expect(firstLabel).toHaveText('00.txt')
  const textIcon = await Command.execute('IconTheme.getFileIcon', { name: '00.txt' })
  const jsonIcon = await Command.execute('IconTheme.getFileIcon', { name: '01.json' })
  await expect(firstIcon).toHaveAttribute('src', textIcon)

  await Command.execute('QuickPick.handleWheel', 0, 30)

  await expect(firstLabel).toHaveText('01.json')
  await expect(firstIcon).toHaveAttribute('src', jsonIcon)

  await Command.execute('QuickPick.handleWheel', 0, -30)
  await expect(firstLabel).toHaveText('00.txt')
  await expect(firstIcon).toHaveAttribute('src', textIcon)
}
