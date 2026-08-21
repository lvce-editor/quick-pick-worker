import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

const toPick = (label: string, value: string): ProtoVisibleItem => ({
  description: '',
  direntType: 0,
  fileIcon: '',
  icon: '',
  label,
  matches: [],
  uri: '',
  value,
})

export const getPicks = async (): Promise<readonly ProtoVisibleItem[]> => {
  return [toPick('LF', 'lf'), toPick('CRLF', 'crlf')]
}
