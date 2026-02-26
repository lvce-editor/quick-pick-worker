import { expect, test } from '@jest/globals'
import * as BeforeInput from '../src/parts/BeforeInput/BeforeInput.ts'
import * as InputEventType from '../src/parts/InputEventType/InputEventType.ts'

test('inserts text at end of value', () => {
  const result = BeforeInput.getNewValue('hello', InputEventType.InsertText, ' world', 5, 5)
  expect(result).toEqual({
    cursorOffset: 11,
    newValue: 'hello world',
  })
})

test('inserts text in middle of value', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.InsertText, 'beautiful ', 6, 6)
  expect(result).toEqual({
    cursorOffset: 16,
    newValue: 'hello beautiful world',
  })
})

test('replaces selected text', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.InsertText, 'hi', 0, 5)
  expect(result).toEqual({
    cursorOffset: 2,
    newValue: 'hi world',
  })
})

test('deletes character backward', () => {
  const result = BeforeInput.getNewValue('hello', InputEventType.DeleteContentBackward, '', 5, 5)
  expect(result).toEqual({
    cursorOffset: 4,
    newValue: 'hell',
  })
})

test('deletes selected text backward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteContentBackward, '', 5, 11)
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello',
  })
})

test('deletes character forward', () => {
  const result = BeforeInput.getNewValue('hello', InputEventType.DeleteContentForward, '', 0, 0)
  expect(result).toEqual({
    cursorOffset: 0,
    newValue: 'ello',
  })
})

test('deletes selected text forward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteContentForward, '', 0, 5)
  expect(result).toEqual({
    cursorOffset: 0,
    newValue: ' world',
  })
})

test('deletes word backward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteWordBackward, '', 11, 11)
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello',
  })
})

test('deletes word forward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteWordForward, '', 0, 0)
  expect(result).toEqual({
    cursorOffset: 0,
    newValue: ' world',
  })
})

test('handles composition text', () => {
  const result = BeforeInput.getNewValue('hello', InputEventType.InsertCompositionText, ' world', 5, 5)
  expect(result).toEqual({
    cursorOffset: 11,
    newValue: 'hello world',
  })
})

test('handles line break', () => {
  const result = BeforeInput.getNewValue('hello\nworld', InputEventType.InsertLineBreak, '', 5, 5)
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello\nworld',
  })
})

test('throws error for unsupported input type', () => {
  expect(() => BeforeInput.getNewValue('hello', 'unsupported', '', 0, 0)).toThrow('unsupported input type unsupported')
})

test('handles empty input value', () => {
  const result = BeforeInput.getNewValue('', InputEventType.InsertText, 'hello', 0, 0)
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello',
  })
})

test('handles empty data', () => {
  const result = BeforeInput.getNewValue('hello', InputEventType.InsertText, '', 5, 5)
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello',
  })
})

test('deletes multiple characters backward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteContentBackward, '', 5, 8)
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hellorld',
  })
})

test('deletes multiple characters forward', () => {
  const result = BeforeInput.getNewValue('hello world', InputEventType.DeleteContentForward, '', 5, 8)
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hellorld',
  })
})
