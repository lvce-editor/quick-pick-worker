import type { InputHandler } from '../InputHandler/InputHandler.ts'
import { getNewValueDeleteContentBackward } from '../GetNewValueDeleteContentBackward/GetNewValueDeleteContentBackward.ts'
import { getNewValueDeleteContentForward } from '../GetNewValueDeleteContentForward/GetNewValueDeleteContentForward.ts'
import { getNewValueDeleteWordBackward } from '../GetNewValueDeleteWordBackward/GetNewValueDeleteWordBackward.ts'
import { getNewValueDeleteWordForward } from '../GetNewValueDeleteWordForward/GetNewValueDeleteWordForward.ts'
import { getNewValueInsertCompositionText } from '../GetNewValueInsertCompositionText/GetNewValueInsertCompositionText.ts'
import { getNewValueInsertLineBreak } from '../GetNewValueInsertLineBreak/GetNewValueInsertLineBreak.ts'
import { getNewValueInsertText } from '../GetNewValueInsertText/GetNewValueInsertText.ts'
import * as InputEventType from '../InputEventType/InputEventType.ts'

export const getNewValueFunction = (inputType: string): InputHandler => {
  switch (inputType) {
    case InputEventType.DeleteContentBackward:
      return getNewValueDeleteContentBackward
    case InputEventType.DeleteContentForward:
      return getNewValueDeleteContentForward
    case InputEventType.DeleteWordBackward:
      return getNewValueDeleteWordBackward
    case InputEventType.DeleteWordForward:
      return getNewValueDeleteWordForward
    case InputEventType.InsertCompositionText:
      return getNewValueInsertCompositionText
    case InputEventType.InsertFromPaste:
    case InputEventType.InsertText:
      return getNewValueInsertText
    case InputEventType.InsertLineBreak:
      return getNewValueInsertLineBreak
    default:
      throw new Error(`unsupported input type ${inputType}`)
  }
}
