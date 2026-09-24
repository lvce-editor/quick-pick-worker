import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-recent-remote-ssh'

export const test: Test = async ({ Command, expect, Extension, IconTheme, Locator, QuickPick }) => {
  await Extension.addWebExtension(import.meta.resolve('../extension'))
  await Command.execute('RecentlyOpened.clearRecentlyOpened')
  await Command.execute('RecentlyOpened.addToRecentlyOpened', 'remote-ssh://89.167.102.168/home/simon/Documents/levivilet/lvce-editor')
  await IconTheme.setIconTheme('test-scroll-icons')

  await Command.execute('QuickPick.showRecent')

  const label = Locator('.QuickPickItemLabel').nth(0)
  const description = Locator('.QuickPickItemDescription').nth(0)
  const icon = Locator('.QuickPickItem .FileIcon').nth(0)
  await expect(label).toHaveText('lvce-editor [SSH: 89.167.102.168]')
  await expect(description).toHaveText('/home/simon/Documents/levivilet')
  const folderIcon = await Command.execute('IconTheme.getFolderIcon', { name: 'lvce-editor' })
  await expect(icon).toHaveAttribute('src', folderIcon)
  await QuickPick.setValue('lvce-editor')
  await expect(label).toHaveText('lvce-editor [SSH: 89.167.102.168]')
}
