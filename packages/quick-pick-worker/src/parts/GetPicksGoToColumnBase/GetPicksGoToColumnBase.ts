import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { getText } from '../GetText/GetText.ts'

export const getPicksGoToColumnBase = async (): Promise<readonly ProtoVisibleItem[]> => {
  const text = await getText()
  return [
    {
      description: '',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: `Type a character position to go to (from 1 to ${text.length})`,
      matches: [],
      uri: '',
    },
  ]
}
