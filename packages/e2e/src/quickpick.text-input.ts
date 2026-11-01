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
  const status = Locator('.QuickPickStatus')
  const listbox = Locator('#QuickPick [role="listbox"]')
  const combobox = Locator('#QuickPick [role="combobox"]')
  const quickPick = Locator('#QuickPick')
  await expect(input).toHaveValue('World')
  await expect(status).toHaveCount(0)
  await expect(listbox).toHaveCount(0)
  await expect(combobox).toHaveCount(0)
  await QuickPick.setValue('Ada')
  await expect(input).toHaveValue('Ada')
  await expect(status).toHaveCount(0)
  await Command.execute('QuickPick.selectCurrentIndex')
  await expect(quickPick).toBeHidden()
}
