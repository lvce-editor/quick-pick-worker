import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.scrollbar-pointer-down'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  await QuickPick.open()
  await QuickPick.setValue('>')

  const quickPick = Locator('.QuickPick')
  const scrollBar = Locator('.ScrollBar')
  const scrollBarThumb = Locator('.ScrollBarThumb')
  const activeItem = Locator('.QuickPickItemActive')

  await expect(scrollBarThumb).toBeVisible()
  await expect(activeItem).toHaveAttribute('aria-posinset', '1')

  // eslint-disable-next-line e2e/no-direct-click -- Exercise scrollbar pointer event bubbling in the real DOM.
  await scrollBar.click()

  await expect(quickPick).toBeVisible()
  await expect(scrollBarThumb).not.toHaveCSS('translate', '0px')
  await expect(activeItem).toHaveAttribute('aria-posinset', '1')

  await QuickPick.setValue('> Window:')
  await QuickPick.focusNext()
  await expect(quickPick).toBeVisible()
}
