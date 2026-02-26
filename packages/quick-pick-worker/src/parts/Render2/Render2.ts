import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly unknown[] => {
  const { newState, oldState } = QuickPickStates.get(uid)
  if (oldState === newState) {
    return []
  }
  QuickPickStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
