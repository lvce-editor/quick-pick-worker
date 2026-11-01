import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.file-filter-narrowing'

export const test: Test = async ({ expect, FileSystem, Locator, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: '', uri: `${tmpDir}/a.ts` },
    { content: '', uri: `${tmpDir}/ab.ts` },
    { content: '', uri: `${tmpDir}/b.ts` },
  ])
  await Workspace.setPath(tmpDir)
  await QuickPick.open()

  // act
  await QuickPick.setValue('a')

  // assert
  const firstItemLabel = Locator('.QuickPickItemLabel').nth(0)
  await expect(firstItemLabel).toHaveText('a.ts')

  // act
  await QuickPick.setValue('ab')

  // assert
  await expect(firstItemLabel).toHaveText('ab.ts')
}
