import type { InputResult } from '../InputResult/InputResult.ts'

export interface InputHandler {
  (value: string, selectionStart: number, selectionEnd: number, data: string): InputResult
}
