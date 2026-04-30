const getScrollBarOffset = (delta: number, finalDelta: number, size: number, scrollBarSize: number): number => {
  if (finalDelta <= 0) {
    return 0
  }
  const scrollBarOffset = (delta / finalDelta) * (size - scrollBarSize)
  return scrollBarOffset
}

export const getScrollBarY = getScrollBarOffset

export const getDeltaY = (scrollBarY: number, finalDelta: number, size: number, scrollBarSize: number): number => {
  const scrollBarRange = size - scrollBarSize
  if (finalDelta <= 0 || scrollBarRange <= 0) {
    return 0
  }
  return (scrollBarY / scrollBarRange) * finalDelta
}
