import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFileIconVirtualDom from '../src/parts/GetFileIconVirtualDom/GetFileIconVirtualDom.ts'

test('creates virtual dom node for file icon', () => {
  const icon = '/path/to/icon.png'
  const result = GetFileIconVirtualDom.getFileIconVirtualDom(icon)
  expect(result).toEqual({
    childCount: 0,
    className: ClassNames.FileIcon,
    role: AriaRoles.None,
    src: icon,
    type: VirtualDomElements.Img,
  })
})

test('handles empty icon path', () => {
  const icon = ''
  const result = GetFileIconVirtualDom.getFileIconVirtualDom(icon)
  expect(result).toEqual({
    childCount: 0,
    className: ClassNames.FileIcon,
    role: AriaRoles.None,
    src: '',
    type: VirtualDomElements.Img,
  })
})

test('preserves icon path in src attribute', () => {
  const icon = '/custom/path/file-icon.svg'
  const result = GetFileIconVirtualDom.getFileIconVirtualDom(icon)
  expect(result.src).toBe('/custom/path/file-icon.svg')
})
