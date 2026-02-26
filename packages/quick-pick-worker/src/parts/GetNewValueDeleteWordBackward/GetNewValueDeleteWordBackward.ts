import type { InputResult } from '../InputResult/InputResult.ts'
import { isAlphaNumeric } from '../IsAlphaNumeric/IsAlphaNumeric.ts'

export const getNewValueDeleteWordBackward = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  const after = value.slice(selectionEnd)
  if (selectionStart === selectionEnd) {
    let startIndex = Math.max(selectionStart - 1, 0)
    while (startIndex > 0 && isAlphaNumeric(value[startIndex])) {
      startIndex--
    }
    const before = value.slice(0, startIndex)
    const newValue = before + after
    return {
      cursorOffset: before.length,
      newValue,
    }
  }
  const before = value.slice(0, selectionStart)
  const newValue = before + after
  return {
    cursorOffset: selectionStart,
    newValue,
  }
}
