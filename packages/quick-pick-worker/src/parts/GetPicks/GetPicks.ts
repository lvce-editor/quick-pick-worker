import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'

export interface IGetPicks {
  (
    value: string,
    args: readonly unknown[],
    { applicationId, assetDir, platform }: { assetDir: string; platform: number; applicationId?: string },
  ): Promise<readonly ProtoVisibleItem[]>
}

export const getPicks = (
  id: number,
  searchValue: string,
  args: readonly unknown[],
  { applicationId, assetDir, platform }: { assetDir: string; platform: number; applicationId?: string },
): Promise<readonly ProtoVisibleItem[]> => {
  const fn = QuickPickEntries.getPicks(id)
  return fn(searchValue, args, { applicationId, assetDir, platform })
}
