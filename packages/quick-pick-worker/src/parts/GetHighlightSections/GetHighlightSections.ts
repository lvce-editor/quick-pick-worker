import type { HighlightSection } from '../HighlightSection/HighlightSection.ts'
import { emptyHighlightSections } from '../EmptyHighlightSections/EmptyHighlightSections.ts'

export const getHighlightSections = (highlights: readonly number[], label: string): readonly HighlightSection[] => {
  if (highlights.length === 0) {
    return emptyHighlightSections
  }
  const sections: HighlightSection[] = []
  let position = 0
  for (let i = 0; i < highlights.length; i += 2) {
    const highlightStart = highlights[i]
    const highlightEnd = highlights[i + 1]
    if (position < highlightStart) {
      const beforeText = label.slice(position, highlightStart)
      sections.push({
        highlighted: false,
        text: beforeText,
      })
    }
    const highlightText = label.slice(highlightStart, highlightEnd)
    sections.push({
      highlighted: true,
      text: highlightText,
    })
    position = highlightEnd
  }
  if (position < label.length) {
    const afterText = label.slice(position)
    sections.push({
      highlighted: false,
      text: afterText,
    })
  }
  return sections
}
