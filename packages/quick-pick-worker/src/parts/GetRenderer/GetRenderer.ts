import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderCursorOffset from '../RenderCursorOffset/RenderCursorOffset.ts'
import * as RenderFocus from '../RenderFocus/RenderFocus.ts'
import * as RenderFocusedIndex from '../RenderFocusedIndex/RenderFocusedIndex.ts'
import * as RenderHeight from '../RenderHeight/RenderHeight.ts'
import { renderIncremental } from '../RenderIncremental/RenderIncremental.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'
import * as RenderValue from '../RenderValue/RenderValue.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.Height:
      return RenderHeight.renderHeight
    case DiffType.RenderCursorOffset:
      return RenderCursorOffset.renderCursorOffset
    case DiffType.RenderFocus:
      return RenderFocus.renderFocus
    case DiffType.RenderFocusedIndex:
      return RenderFocusedIndex.renderFocusedIndex
    case DiffType.RenderIncremental:
      return renderIncremental
    case DiffType.RenderItems:
      return RenderItems.renderItems
    case DiffType.RenderValue:
      return RenderValue.renderValue
    default:
      throw new Error('unknown renderer')
  }
}
