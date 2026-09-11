import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-recent-remote-ssh'

export const test: Test = async ({ Command, expect, IconTheme, Locator, QuickPick }) => {
  await Command.execute('RecentlyOpened.clearRecentlyOpened')
  await Command.execute('RecentlyOpened.addToRecentlyOpened', 'remote-ssh://example.com/')
  await IconTheme.setIconTheme('test-scroll-icons')

  await QuickPick.executeCommand('>File: Open Recent')

  await expect(Locator('.QuickPickItemLabel').nth(0)).toHaveText('example.com')
  await expect(Locator('.QuickPickItemDescription').nth(0)).toHaveText('remote-ssh://example.com/')
  const folderIcon = await Command.execute('IconTheme.getFolderIcon', { name: 'example.com' })
  await expect(Locator('.QuickPickItem .FileIcon').nth(0)).toHaveAttribute('src', folderIcon)
  await QuickPick.setValue('example')
  await expect(Locator('.QuickPickItemLabel').nth(0)).toHaveText('example.com')
}
