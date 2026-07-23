import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.file-filter-single-result'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: 'alpha', uri: `${tmpDir}/alpha.txt` },
    { content: 'beta', uri: `${tmpDir}/beta.txt` },
  ])
  await Workspace.setPath(tmpDir)
  await QuickPick.open()

  // act
  await QuickPick.setValue('alpha')

  // assert
  const firstItemLabel = Locator('.QuickPickItemLabel').nth(0)
  await expect(firstItemLabel).toHaveText('alpha.txt')
}
