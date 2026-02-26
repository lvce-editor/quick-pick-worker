import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetQuickPickInputVirtualDom from '../GetQuickPickInputVirtualDom/GetQuickPickInputVirtualDom.ts'

export const getQuickPickHeaderVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.QuickPickHeader,
      type: VirtualDomElements.Div,
    },
    GetQuickPickInputVirtualDom.getQuickPickInputVirtualDom(),
  ]
}
