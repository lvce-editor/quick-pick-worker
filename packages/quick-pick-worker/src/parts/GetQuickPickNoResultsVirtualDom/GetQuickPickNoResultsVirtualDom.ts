import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const quickPickNoResultsDomNodes: readonly VirtualDomNode[] = [
  {
    childCount: 1,
    className: MergeClassNames.mergeClassNames(ClassNames.QuickPickItem, ClassNames.QuickPickItemActive, ClassNames.QuickPickStatus),
    type: VirtualDomElements.Div,
  },
  {
    childCount: 1,
    className: ClassNames.Label,
    type: VirtualDomElements.Div,
  },
]

export const getQuickPickNoResultsVirtualDom = (): readonly VirtualDomNode[] => {
  const noResults = QuickPickStrings.noResults()
  return [...quickPickNoResultsDomNodes, text(noResults)]
}
