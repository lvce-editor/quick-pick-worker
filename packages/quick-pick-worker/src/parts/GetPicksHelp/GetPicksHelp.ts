import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as Character from '../Character/Character.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getPicks = async (): Promise<readonly ProtoVisibleItem[]> => {
  return [
    {
      description: QuickPickStrings.goToFile(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: Character.DotDotDot,
      matches: [],
      uri: '',
    },
    {
      description: QuickPickStrings.goToLineColumn(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: ':',
      matches: [],
      uri: '',
    },
    {
      description: QuickPickStrings.goToSymbolInEditor(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: Character.Colon,
      matches: [],
      uri: '',
    },
    {
      description: QuickPickStrings.searchForText(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: Character.Percent,
      matches: [],
      uri: '',
    },
    {
      description: QuickPickStrings.showAndRunCommands(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: Character.AngleBracket,
      matches: [],
      uri: '',
    },
    {
      description: QuickPickStrings.openView(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: Character.View,
      matches: [],
      uri: '',
    },
  ]
}
