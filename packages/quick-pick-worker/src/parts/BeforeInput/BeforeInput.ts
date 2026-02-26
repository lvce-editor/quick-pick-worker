import type { InputResult } from '../InputResult/InputResult.ts'
import * as GetNewValueFunction from '../GetNewValueFunction/GetNewValueFunction.ts'

export const getNewValue = (value: string, inputType: string, data: string, selectionStart: number, selectionEnd: number): InputResult => {
  const fn = GetNewValueFunction.getNewValueFunction(inputType)
  return fn(value, selectionStart, selectionEnd, data)
}
