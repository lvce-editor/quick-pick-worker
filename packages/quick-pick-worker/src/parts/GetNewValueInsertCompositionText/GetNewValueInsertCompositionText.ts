import type { InputResult } from '../InputResult/InputResult.ts'
import { getNewValueInsertText } from '../GetNewValueInsertText/GetNewValueInsertText.ts'

export const getNewValueInsertCompositionText = (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult => {
  return getNewValueInsertText(value, selectionStart, selectionEnd, data)
}
