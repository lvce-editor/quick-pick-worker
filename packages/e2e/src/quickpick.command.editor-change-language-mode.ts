import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.command.editor-change-language-mode'

export const test: Test = async ({ expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'test')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/test.txt`)

  // act
  await QuickPick.open()
  await QuickPick.setValue('>Change Language Mode')
  await QuickPick.selectItem('Change Language Mode', {
    waitUntil: 'quickPick',
  })
  await QuickPick.setValue('xyz')

  // assert
  const firstItem = Locator('.QuickPickItem').nth(0)
  await expect(firstItem).toHaveText('xyz')

  // act
  await QuickPick.selectItem('xyz')

  // assert
  const token = Locator('.Token.Xyz', {
    hasText: 'test',
  })
  await expect(token).toBeVisible()
}
