import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.keyboard-navigation-scrollbar'

export const skip = 1

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('>')

  const activeItem = Locator('.QuickPickItemActive')
  const scrollBarThumb = Locator('.ScrollBarThumb')

  await expect(scrollBarThumb).toBeVisible()

  // act
  for (let i = 0; i < 13; i++) {
    await QuickPick.focusNext()
  }

  // assert
  await expect(activeItem).toBeVisible()
  await expect(activeItem).toHaveAttribute('aria-posinset', '14')
  await expect(scrollBarThumb).not.toHaveCSS('translate', '0px')
  await expect(scrollBarThumb).not.toHaveCSS('translate', '0px 5px')
}
