import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as SetColorTheme from '../SetColorTheme/SetColorTheme.ts'

export const focusPick = async (pick: ProtoVisibleItem): Promise<void> => {
  const { label } = pick
  await SetColorTheme.setColorTheme(label)
}
