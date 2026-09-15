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
}`
}
