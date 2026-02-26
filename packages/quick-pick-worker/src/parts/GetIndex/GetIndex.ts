export const getIndex = (top: number, headerHeight: number, itemHeight: number, y: number): number => {
  const relativeY = y - top - headerHeight
  const index = Math.floor(relativeY / itemHeight)
  return index
}
