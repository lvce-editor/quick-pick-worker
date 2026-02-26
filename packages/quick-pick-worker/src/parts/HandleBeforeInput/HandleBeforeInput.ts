import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as BeforeInput from '../BeforeInput/BeforeInput.ts'
import * as ViewletQuickPickHandleInput from '../HandleInput/HandleInput.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleBeforeInput = (
  state: QuickPickState,
  inputType: string,
  data: string,
  selectionStart: number,
  selectionEnd: number,
): Promise<QuickPickState> => {
  Assert.string(inputType)
  Assert.number(selectionStart)
  Assert.number(selectionEnd)
  const { value } = state
  const { cursorOffset, newValue } = BeforeInput.getNewValue(value, inputType, data, selectionStart, selectionEnd)
  return ViewletQuickPickHandleInput.handleInput(state, newValue, cursorOffset, InputSource.User)
}
