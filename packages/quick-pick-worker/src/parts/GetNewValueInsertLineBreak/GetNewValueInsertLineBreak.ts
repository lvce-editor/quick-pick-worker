import type { InputResult } from '../InputResult/InputResult.ts'

export const getNewValueInsertLineBreak = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  return {
    cursorOffset: selectionEnd,
    newValue: value,
  }
}
