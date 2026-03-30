import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export interface Renderer {
  (oldState: QuickPickState, newState: QuickPickState): readonly unknown[]
}
