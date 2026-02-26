import type { InputResult } from '../InputResult/InputResult.ts'
import { isAlphaNumeric } from '../IsAlphaNumeric/IsAlphaNumeric.ts'

export const getNewValueDeleteWordForward = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  const before = value.slice(0, selectionStart)
  if (selectionStart === selectionEnd) {
    let startIndex = Math.min(selectionStart + 1, value.length - 1)
    while (startIndex < value.length && isAlphaNumeric(value[startIndex])) {
      startIndex++
    }
    const after = value.slice(startIndex)
    const newValue = before + after
    return {
      cursorOffset: before.length,
      newValue,
    }
  }
  const after = value.slice(selectionEnd)
  const newValue = before + after
  return {
    cursorOffset: selectionStart,
    newValue,
  }
}
