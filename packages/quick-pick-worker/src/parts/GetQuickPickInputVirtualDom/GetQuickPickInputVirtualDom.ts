import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getQuickPickInputVirtualDom = (placeholder = '', ariaLabel = QuickPickStrings.typeNameofCommandToRun()): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.QuickPickInputWrapper,
      type: VirtualDomElements.Div,
    },
    {
      ariaAutoComplete: 'list',
      ariaExpanded: true,
      ariaLabel: ariaLabel,
      autocapitalize: 'off',
      autocomplete: 'off',
      childCount: 0,
      className: ClassNames.InputBox,
      inputType: 'text',
      name: InputName.QuickPickInput,
      onBlur: DomEventListenerFunctions.HandleBlur,
      onFocus: DomEventListenerFunctions.HandleFocus,
      onInput: DomEventListenerFunctions.HandleInput,
      placeholder,
      role: AriaRoles.ComboBox,
      spellcheck: false,
      type: VirtualDomElements.Input,
    },
  ]
}
