import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.quick-pick-keyboard-navigation'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file.txt`, '')
  await Workspace.setPath(tmpDir)

  // act
  await QuickPick.open()

  // assert
  const quickPick = Locator('#QuickPick')
  await expect(quickPick).toBeVisible()
  const quickPickItems = Locator('.QuickPickItem')
  const firstQuickPickItem = quickPickItems.nth(0)
  const secondQuickPickItem = quickPickItems.nth(1)
  const tenthQuickPickItem = quickPickItems.nth(9)
  await expect(firstQuickPickItem).toHaveId('QuickPickItemActive')

  // act
  await QuickPick.focusNext()

  // assert
  await expect(firstQuickPickItem).toHaveId('')
  await expect(secondQuickPickItem).toHaveId('QuickPickItemActive')

  // act
  await QuickPick.focusPrevious()

  // assert
  await expect(firstQuickPickItem).toHaveId('QuickPickItemActive')
  await expect(secondQuickPickItem).toHaveId('')

  // act
  await QuickPick.focusIndex(9)

  // assert
  await expect(tenthQuickPickItem).toHaveId('QuickPickItemActive')

  // act
  await QuickPick.focusNext()
  await expect(tenthQuickPickItem).toHaveId('QuickPickItemActive')

  // act
  await QuickPick.setValue('')
}
