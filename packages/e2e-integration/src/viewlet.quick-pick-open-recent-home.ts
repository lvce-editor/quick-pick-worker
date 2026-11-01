import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.quick-pick-open-recent-home'

export const test: Test = async ({ Command, RecentlyOpened, expect, Locator, QuickPick }) => {
  const homeDir = await Command.execute('Workspace.getHomeDir')
  await RecentlyOpened.clear()
  await RecentlyOpened.add(`file://${homeDir}/Documents/levivilet`)
  await RecentlyOpened.add(`file://${homeDir}ish/Documents/levivilet`)

  await Command.execute('QuickPick.showRecent')
  await QuickPick.setValue('levivilet')

  const descriptions = Locator('.QuickPickItemDescription')
  const firstDescription = descriptions.nth(0)
  const secondDescription = descriptions.nth(1)
  await expect(firstDescription).toHaveText(`${homeDir}ish/Documents`)
  await expect(secondDescription).toHaveText('~/Documents')
}
