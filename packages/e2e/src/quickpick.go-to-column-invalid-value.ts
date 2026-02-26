import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.go-to-column-invalid-value'

export const test: Test = async ({ expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc\ndef')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/a.txt`)
  await QuickPick.open()

  // act
  await QuickPick.setValue('::invalid')

  // assert
  const label = Locator('.QuickPickItemLabel')
  await expect(label).toBeVisible()
  await expect(label).toHaveText(`Type a character position to go to (from 1 to 7)`)
}
