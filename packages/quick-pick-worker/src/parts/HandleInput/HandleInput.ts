import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as SetValue from '../SetValue/SetValue.ts'

export const handleInputWithContext = async (
  context: AsyncCommandContext<QuickPickState>,
  newValue: string,
  cursorOffset: number,
  inputSource = InputSource.Script,
): Promise<void> => {
  const state = context.getState()
  if (state.value !== newValue) {
    await SetValue.setValueWithContext(context, newValue)
  }
  await context.updateState((latestState) => {
    if (latestState.value !== newValue) {
      return latestState
    }
    return {
      ...latestState,
      cursorOffset,
      inputSource,
    }
  })
}

// TODO when user types letters -> no need to query provider again -> just filter existing results
export const handleInput = async (
  state: QuickPickState,
  newValue: string,
  cursorOffset: number,
  inputSource = InputSource.Script,
): Promise<QuickPickState> => {
  if (state.value === newValue) {
    return {
      ...state,
      cursorOffset,
      inputSource,
    }
  }
  const newState = await SetValue.setValue(state, newValue)
  return {
    ...newState,
    cursorOffset,
    inputSource,
  }
}
