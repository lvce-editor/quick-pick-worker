import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.file-filter-no-results'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/alpha.txt`, 'alpha')
  await Workspace.setPath(tmpDir)
  await QuickPick.open()

  // act
  await QuickPick.setValue('missing-file')

  // assert
  const noResultMessage = Locator('.QuickPickStatus')
  await expect(noResultMessage).toHaveText('No Results')
}
