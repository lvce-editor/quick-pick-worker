import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.text-input'

export const test: Test = async ({ Command, expect, Locator, QuickPick }) => {
  await Command.execute('QuickPick.showCustom', [], {
    initialValue: 'World',
    mode: 'quickInput',
    type: 'text',
    waitUntil: 'visible',
  })
  const input = Locator('#QuickPick .InputBox')
  await expect(input).toHaveValue('World')
  await expect(Locator('.QuickPickStatus')).toHaveCount(0)
  await expect(Locator('#QuickPick [role="listbox"]')).toHaveCount(0)
  await expect(Locator('#QuickPick [role="combobox"]')).toHaveCount(0)
  await QuickPick.setValue('Ada')
  await expect(input).toHaveValue('Ada')
  await expect(Locator('.QuickPickStatus')).toHaveCount(0)
  await Command.execute('QuickPick.selectCurrentIndex')
  await expect(Locator('#QuickPick')).toBeHidden()
}
