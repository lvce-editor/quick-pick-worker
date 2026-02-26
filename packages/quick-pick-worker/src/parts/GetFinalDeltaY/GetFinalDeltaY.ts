export const getFinalDeltaY = (height: number, itemHeight: number, itemsLength: number): number => {
  const contentHeight = itemsLength * itemHeight
  const finalDeltaY = Math.max(contentHeight - height, 0)
  return finalDeltaY
}
