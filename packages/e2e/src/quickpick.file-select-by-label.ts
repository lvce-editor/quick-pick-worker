import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.file-select-by-label'

export const skip = 1

export const test: Test = async ({ FileSystem, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/alpha.txt`, 'alpha')
  await Workspace.setPath(tmpDir)
  await QuickPick.open()
  await QuickPick.setValue('alpha')

  // act
  await QuickPick.selectItem('alpha.txt')

  // assert
  await Main.shouldHaveLayout({
    groups: [
      {
        tabs: [
          {
            uri: `${tmpDir}/alpha.txt`,
          },
        ],
      },
    ],
  })
}
