import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getQuickPickInputVirtualDom = (): VirtualDomNode => {
  const ariaLabel = QuickPickStrings.typeNameofCommandToRun()
  return {
    ariaAutoComplete: 'list',
    ariaExpanded: true,
    ariaLabel: ariaLabel,
    autocapitalize: 'off',
    autocomplete: 'off',
    childCount: 0,
    className: ClassNames.InputBox,
    inputType: 'text',
    name: InputName.QuickPickInput,
    onBeforeInput: DomEventListenerFunctions.HandleBeforeInput,
    onBlur: DomEventListenerFunctions.HandleBlur,
    onFocus: DomEventListenerFunctions.HandleFocus,
    onInput: DomEventListenerFunctions.HandleInput,
    role: AriaRoles.ComboBox,
    spellcheck: false,
    type: VirtualDomElements.Input,
  }
}
