import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetHighlights from '../GetHighlights/GetHighlights.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getQuickPickItemVirtualDom = (visibleItem: VisibleItem): readonly VirtualDomNode[] => {
  const { description, fileIcon, highlights, icon, isActive, label, posInSet, setSize } = visibleItem
  const dom: VirtualDomNode[] = [
    {
      ariaPosInSet: posInSet,
      ariaSetSize: setSize,
      childCount: 1,
      className: ClassNames.QuickPickItem,
      role: AriaRoles.Option,
      type: VirtualDomElements.Div,
    },
  ]
  const parent = dom[0] as VirtualDomNode & { id?: string; className: string; childCount: number }
  if (isActive) {
    parent.id = DomId.QuickPickItemActive
    parent.className += ' ' + ClassNames.QuickPickItemActive
  }
  if (fileIcon) {
    parent.childCount++
    dom.push(GetFileIconVirtualDom.getFileIconVirtualDom(fileIcon))
  } else if (icon) {
    parent.childCount++
    dom.push({
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.QuickPickMaskIcon, ClassNames.MaskIcon, `MaskIcon${icon}`),
      type: VirtualDomElements.Div,
    })
  }
  const highlightDom = GetHighlights.getHighlights(highlights, label)
  dom.push(...highlightDom)
  if (description) {
    parent.childCount++
    dom.push(
      {
        childCount: 1,
        className: ClassNames.QuickPickItemDescription,
        type: VirtualDomElements.Div,
      },
      text(description),
    )
  }
  return dom
}
