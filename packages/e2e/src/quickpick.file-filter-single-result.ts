import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.file-filter-single-result'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/alpha.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/beta.txt`, 'beta')
  await Workspace.setPath(tmpDir)
  await QuickPick.open()

  // act
  await QuickPick.setValue('alpha')

  // assert
  const firstItemLabel = Locator('.QuickPickItemLabel').nth(0)
  await expect(firstItemLabel).toHaveText('alpha.txt')
}
