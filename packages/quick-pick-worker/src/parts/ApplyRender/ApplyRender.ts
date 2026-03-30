import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = (oldState: QuickPickState, newState: QuickPickState, diffResult: readonly number[]): readonly unknown[] => {
  const commands = []
  for (const item of diffResult) {
    if (item === DiffType.Height) {
      continue
    }
    if (item === DiffType.RenderFocusedIndex) {
      continue
    }
    const fn = GetRenderer.getRenderer(item)
    commands.push(fn(oldState, newState))
  }
  return commands
}
