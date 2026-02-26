import * as DiffFocus from '../DiffFocus/DiffFocus.ts'
import * as DiffFocusedIndex from '../DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffHeight from '../DiffHeight/DiffHeight.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as DiffValue from '../DiffValue/DiffValue.ts'

export const modules = [DiffHeight.isEqual, DiffItems.isEqual, DiffValue.isEqual, DiffFocusedIndex.isEqual, DiffFocus.isEqual]

export const numbers = [DiffType.Height, DiffType.RenderItems, DiffValue.diffType, DiffType.RenderFocusedIndex, DiffType.RenderFocus]
