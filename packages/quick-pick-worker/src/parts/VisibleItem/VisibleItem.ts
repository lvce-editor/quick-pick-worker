import type { HighlightSection } from '../HighlightSection/HighlightSection.ts'

export interface VisibleItem {
  readonly description: string
  readonly fileIcon: string
  readonly highlights: readonly HighlightSection[]
  readonly icon: string
  readonly isActive: boolean
  readonly label: string
  readonly posInSet: number
  readonly setSize: number
}
