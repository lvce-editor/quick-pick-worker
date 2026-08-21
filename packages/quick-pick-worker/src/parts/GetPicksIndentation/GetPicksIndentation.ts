import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

const toPick = (label: string, value: boolean): ProtoVisibleItem => ({
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
  return [toPick('Indent Using Spaces', true), toPick('Indent Using Tabs', false)]
}
