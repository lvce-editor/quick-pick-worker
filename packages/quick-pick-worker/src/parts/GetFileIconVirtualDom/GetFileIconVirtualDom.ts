import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getFileIconVirtualDom = (icon: string): VirtualDomNode => {
  return {
    childCount: 0,
    className: ClassNames.FileIcon,
    role: AriaRoles.None,
    src: icon,
    type: VirtualDomElements.Img,
  }
}
