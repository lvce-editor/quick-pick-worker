import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command.quickpick-showcolortheme'

export const test: Test = async ({ expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'test')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/test.txt`)

  // act
  await QuickPick.open()
  await QuickPick.setValue('>Preferences: Color Theme')
  await QuickPick.selectItem('Preferences: Color Theme', {
    waitUntil: 'quickPick',
  })

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('atom-one-dark')

  // act
  await QuickPick.setValue('ayu')
  await QuickPick.selectIndex(0)

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeHidden()

  // act
  await QuickPick.open()
  await QuickPick.setValue('>Preferences: Color Theme')
  await QuickPick.selectItem('Preferences: Color Theme', {
    waitUntil: 'quickPick',
  })

  // assert
  const activeItem = Locator('.QuickPickItemActive')
  await expect(activeItem).toHaveText('ayu')

  // act
  await QuickPick.selectIndex(1)

  // assert
  await expect(quickPick).toBeHidden()
}
