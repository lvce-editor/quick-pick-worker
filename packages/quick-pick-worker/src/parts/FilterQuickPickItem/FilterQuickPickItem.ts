import * as FuzzySearch from '@lvce-editor/fuzzy-search'

export const filterQuickPickItem = (pattern: string, word: string): readonly number[] => {
  const matches = FuzzySearch.fuzzySearch(pattern, word)
  return matches
}
