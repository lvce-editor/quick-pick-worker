import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-recent-remote-ssh'

export const test: Test = async ({ Command, expect, IconTheme, Locator, QuickPick }) => {
  await Command.execute('RecentlyOpened.clearRecentlyOpened')
  await Command.execute('RecentlyOpened.addToRecentlyOpened', 'remote-ssh://example.com/')
  await IconTheme.setIconTheme('test-scroll-icons')

  await QuickPick.executeCommand('>File: Open Recent')

  const label = Locator('.QuickPickItemLabel').nth(0)
  const description = Locator('.QuickPickItemDescription').nth(0)
  const icon = Locator('.QuickPickItem .FileIcon').nth(0)
  await expect(label).toHaveText('example.com')
  await expect(description).toHaveText('remote-ssh://example.com/')
  const folderIcon = await Command.execute('IconTheme.getFolderIcon', { name: 'example.com' })
  await expect(icon).toHaveAttribute('src', folderIcon)
  await QuickPick.setValue('example')
  await expect(label).toHaveText('example.com')
}
