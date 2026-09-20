import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-recent-home'

export const test: Test = async ({ Command, expect, Locator, QuickPick }) => {
  const homeDir = await Command.execute('Workspace.getHomeDir')
  await Command.execute('RecentlyOpened.clearRecentlyOpened')
  await Command.execute('RecentlyOpened.addToRecentlyOpened', `file://${homeDir}/Documents/levivilet`)
  await Command.execute('RecentlyOpened.addToRecentlyOpened', `file://${homeDir}ish/Documents/levivilet`)

  await Command.execute('QuickPick.showRecent')
  await QuickPick.setValue('levivilet')

  const descriptions = Locator('.QuickPickItemDescription')
  await expect(descriptions.nth(0)).toHaveText(`~ish/Documents`)
  await expect(descriptions.nth(1)).toHaveText('~/Documents')
}
