import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetQuickPickInputVirtualDom from '../src/parts/GetQuickPickInputVirtualDom/GetQuickPickInputVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getQuickPickInputVirtualDom', () => {
  const result = GetQuickPickInputVirtualDom.getQuickPickInputVirtualDom()

  expect(result).toEqual({
    ariaAutoComplete: 'list',
    ariaExpanded: true,
    ariaLabel: expect.any(String),
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
  })
})
