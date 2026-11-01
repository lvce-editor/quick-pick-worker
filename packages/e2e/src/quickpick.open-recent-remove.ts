import type { Test } from '@lvce-editor/test-with-playwright'

// The hover styles are provided by the lvce-editor consumer and are validated by its integration test.
export const skip = 1

export const name = 'quickpick.open-recent-remove'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('RecentlyOpened.clearRecentlyOpened')
  await Command.execute('RecentlyOpened.addToRecentlyOpened', 'remote-ssh://one.example/test/one')
  await Command.execute('RecentlyOpened.addToRecentlyOpened', 'remote-ssh://two.example/test/two')
  await Command.execute('QuickPick.showRecent')

  const items = Locator('.QuickPickItem')
  const firstItem = items.nth(0)
  const firstRemoveButton = firstItem.locator('.QuickPickItemRemove')
  const secondItem = items.nth(1)
  const secondRemoveButton = secondItem.locator('.QuickPickItemRemove')
  const input = Locator('#QuickPick .InputBox')

  await input.hover()
  await expect(firstRemoveButton).toBeHidden()
  await firstItem.hover()
  await expect(firstRemoveButton).toBeVisible()
  await secondItem.hover()
  await expect(firstRemoveButton).toBeHidden()
  await expect(secondRemoveButton).toBeVisible()

  await Command.execute('QuickPick.handleClickAt', 0, 0, 'remote-ssh://one.example/test/one')

  await expect(items).toHaveCount(1)
  const remainingItem = items.nth(0)
  const remainingLabel = remainingItem.locator('.QuickPickItemLabel')
  await expect(remainingLabel).toHaveText('two')
  const recentlyOpened = await Command.execute('RecentlyOpened.getRecentlyOpened')
  if (JSON.stringify(recentlyOpened) !== JSON.stringify(['remote-ssh://two.example/test/two'])) {
    throw new Error(`Unexpected recently opened entries: ${JSON.stringify(recentlyOpened)}`)
  }
}
