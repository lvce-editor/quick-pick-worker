import * as DiffCss from '../DiffCss/DiffCss.ts'
import * as DiffFocus from '../DiffFocus/DiffFocus.ts'
import * as DiffFocusedIndex from '../DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as DiffValue from '../DiffValue/DiffValue.ts'

export const modules = [DiffCss.isEqual, DiffItems.isEqual, DiffValue.isEqual, DiffFocusedIndex.isEqual, DiffFocus.isEqual]

export const numbers = [DiffType.RenderCss, DiffType.RenderIncremental, DiffValue.diffType, DiffType.RenderFocusedIndex, DiffType.RenderFocus]
