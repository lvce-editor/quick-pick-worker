export const getCss = (scrollBarHeight: number, scrollBarTop: number, quickPickItemsHeight: number): string => {
  return `.QuickPick {
  --QuickPickItemsHeight: ${quickPickItemsHeight}px;
  --ScrollBarThumbHeight: ${scrollBarHeight}px;
  --ScrollBarThumbTop: ${scrollBarTop}px;
}
.QuickPick .QuickPickItems {
  height: var(--QuickPickItemsHeight);
}
.QuickPick .ScrollBarThumb {
  height: var(--ScrollBarThumbHeight);
  translate: 0px var(--ScrollBarThumbTop);
}`
}