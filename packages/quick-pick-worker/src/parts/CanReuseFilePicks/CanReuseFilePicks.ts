import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as GetQuickPickSubProviderId from '../GetQuickPickSubProviderId/GetQuickPickSubProviderId.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'

// Keep this aligned with file-search-worker's SearchFileWithRipGrep limit.
const maxFileSearchResults = 9_999_999

export const canReuseFilePicks = (providerId: number, previousValue: string, newValue: string, pickCount: number): boolean => {
  if (providerId !== QuickPickEntryId.File && providerId !== QuickPickEntryId.EveryThing) {
    return false
  }
  if (newValue.length <= previousValue.length || !newValue.startsWith(previousValue)) {
    return false
  }
  const previousSubProviderId = GetQuickPickSubProviderId.getQuickPickSubProviderId(providerId, GetQuickPickPrefix.getQuickPickPrefix(previousValue))
  const newSubProviderId = GetQuickPickSubProviderId.getQuickPickSubProviderId(providerId, GetQuickPickPrefix.getQuickPickPrefix(newValue))
  return previousSubProviderId === QuickPickEntryId.File && newSubProviderId === QuickPickEntryId.File && pickCount < maxFileSearchResults
}
