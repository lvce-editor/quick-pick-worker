import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { getText } from '../GetText/GetText.ts'
import { splitLines } from '../SplitLines/SplitLines.ts'

export const getPicksGoToLineBase = async (): Promise<readonly ProtoVisibleItem[]> => {
  const text = await getText()
  const lines = splitLines(text)
  const lineCount = lines.length
  return [
    {
      description: '',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: `Type a line number to go to (from 1 to ${lineCount})`,
      matches: [],
      uri: '',
    },
  ]
}
