import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.edge-character-zero-offset'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, Workspace }) => {
  const label = Locator('.QuickPickItemLabel')
  const expectQuickPickLabel = async (text: string): Promise<void> => {
    const deadline = Date.now() + 5000
    // Direct worker commands finish before the renderer applies their DOM update.
    while (true) {
      try {
        await expect(label).toHaveCount(1)
        await expect(label).toHaveText(text)
        return
      } catch (error) {
        if (Date.now() >= deadline) {
          throw error
        }
        await new Promise((resolve) => setTimeout(resolve, 20))
      }
    }
  }

  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/edge.txt`, 'abc\ndef')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/edge.txt`)
  await QuickPick.open()
  const quickPick = Locator('#QuickPick')

  // act
  // eslint-disable-next-line sonarjs/no-hardcoded-ip
  await QuickPick.setValue('::0')

  // assert
  await expectQuickPickLabel("Press 'Enter' to go to line 0 column 0")

  // act
  await QuickPick.selectIndex(0)

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([0, 0, 0, 0]))
  await expect(quickPick).toBeHidden()
}
