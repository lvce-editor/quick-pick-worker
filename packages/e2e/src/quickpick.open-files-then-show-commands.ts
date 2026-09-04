import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.open-files-then-show-commands'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/example.txt`, '')
  await Workspace.setPath(tmpDir)
  const keyP = 44
  const control = 1 << 11
  await Command.execute('KeyBindings.handleKeyBinding', control | keyP)
  const quickPickInput = Locator('#QuickPick .InputBox')
  await expect(quickPickInput).toBeFocused()

  // act
  await quickPickInput.type('>')
  await new Promise((resolve) => setTimeout(resolve, 200))

  // assert
  await expect(quickPickInput).toHaveValue('>')
  await expect(quickPickInput).toHaveAttribute('aria-label', 'Type the name of a command to run.')
  const firstCommand = Locator('.QuickPickItem').nth(0)
  await expect(firstCommand).toHaveText('Account: Sign In')
}
