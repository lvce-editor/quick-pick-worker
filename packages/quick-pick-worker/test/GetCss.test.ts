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
}`)
})
