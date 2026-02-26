import { test, expect } from '@jest/globals'
import { getNewValueDeleteContentBackward } from '../src/parts/GetNewValueDeleteContentBackward/GetNewValueDeleteContentBackward.ts'
import { getNewValueDeleteContentForward } from '../src/parts/GetNewValueDeleteContentForward/GetNewValueDeleteContentForward.ts'
import { getNewValueDeleteWordBackward } from '../src/parts/GetNewValueDeleteWordBackward/GetNewValueDeleteWordBackward.ts'
import { getNewValueDeleteWordForward } from '../src/parts/GetNewValueDeleteWordForward/GetNewValueDeleteWordForward.ts'
import { getNewValueFunction } from '../src/parts/GetNewValueFunction/GetNewValueFunction.ts'
import { getNewValueInsertCompositionText } from '../src/parts/GetNewValueInsertCompositionText/GetNewValueInsertCompositionText.ts'
import { getNewValueInsertLineBreak } from '../src/parts/GetNewValueInsertLineBreak/GetNewValueInsertLineBreak.ts'
import { getNewValueInsertText } from '../src/parts/GetNewValueInsertText/GetNewValueInsertText.ts'
import * as InputEventType from '../src/parts/InputEventType/InputEventType.ts'

test('returns insert text handler for InsertText', () => {
  const handler = getNewValueFunction(InputEventType.InsertText)
  expect(handler).toBe(getNewValueInsertText)
})

test('returns insert text handler for InsertFromPaste', () => {
  const handler = getNewValueFunction(InputEventType.InsertFromPaste)
  expect(handler).toBe(getNewValueInsertText)
})

test('returns delete content backward handler', () => {
  const handler = getNewValueFunction(InputEventType.DeleteContentBackward)
  expect(handler).toBe(getNewValueDeleteContentBackward)
})

test('returns delete content forward handler', () => {
  const handler = getNewValueFunction(InputEventType.DeleteContentForward)
  expect(handler).toBe(getNewValueDeleteContentForward)
})

test('returns delete word forward handler', () => {
  const handler = getNewValueFunction(InputEventType.DeleteWordForward)
  expect(handler).toBe(getNewValueDeleteWordForward)
})

test('returns delete word backward handler', () => {
  const handler = getNewValueFunction(InputEventType.DeleteWordBackward)
  expect(handler).toBe(getNewValueDeleteWordBackward)
})

test('returns insert line break handler', () => {
  const handler = getNewValueFunction(InputEventType.InsertLineBreak)
  expect(handler).toBe(getNewValueInsertLineBreak)
})

test('returns insert composition text handler', () => {
  const handler = getNewValueFunction(InputEventType.InsertCompositionText)
  expect(handler).toBe(getNewValueInsertCompositionText)
})

test('throws error for unsupported input type', () => {
  expect(() => getNewValueFunction('unsupported')).toThrow('unsupported input type unsupported')
})
