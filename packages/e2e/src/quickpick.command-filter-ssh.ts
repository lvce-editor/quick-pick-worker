import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command-filter-ssh'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()

  // act
  await QuickPick.setValue('>ssh')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('SSH: Connect')
  await expect(firstItem).toHaveId('QuickPickItemActive')
  const weakerMatch = Locator('.QuickPickItem', { hasText: 'Developer: Crash Shared Process' })
  await expect(weakerMatch).toBeVisible()
}
