import * as Diff from '../Diff/Diff.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { newState, oldState } = QuickPickStates.get(uid)
  return Diff.diff(oldState, newState)
}
