import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'

export interface Renderer {
  (model: QuickPickViewModel): readonly unknown[]
}
