import type { InputResult } from '../InputResult/InputResult.ts'

export const getNewValueDeleteContentForward = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  const before = value.slice(0, selectionStart)
  if (selectionStart === selectionEnd) {
    const after = value.slice(selectionEnd + 1)
    const newValue = before + after
    return {
      cursorOffset: selectionStart,
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
