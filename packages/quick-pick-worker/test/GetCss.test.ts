import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'

test('getCss returns css variables for quick pick layout', () => {
  const result = getCss(50, 4, 100)
  expect(result).toEqual(`.QuickPick {
  --QuickPickItemsHeight: 100px;
  --ScrollBarThumbHeight: 50px;
  --ScrollBarThumbTop: 4px;
}
.QuickPick .QuickPickItems {
  height: var(--QuickPickItemsHeight);
}
.QuickPick .ScrollBarThumb {
  height: var(--ScrollBarThumbHeight);
  translate: 0px var(--ScrollBarThumbTop);
}
.QuickPickKeyBinding {
  margin-left: auto;
  display: flex;
  gap: 2px;
  flex-shrink: 0;
  pointer-events: none;
}
.QuickPickKeyBinding .Key {
  padding: 0 4px;
  line-height: 16px;
}
.QuickPickItem:has(.QuickPickKeyBinding) .QuickPickItemLabel {
  flex-shrink: 1;
}`)
})
