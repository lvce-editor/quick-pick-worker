import { expect, test } from '@jest/globals'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.js'

test('renderEventListeners does not register handleBeforeInput', () => {
  const eventListeners = renderEventListeners()
  expect(eventListeners).not.toContainEqual(
    expect.objectContaining({
      name: 'handleBeforeInput',
    }),
  )
})

test('renderEventListeners passes the remove button uri to the click handler', () => {
  const eventListeners = renderEventListeners()
  expect(eventListeners).toContainEqual({
    name: 'handlePointerDown',
    params: ['handleClickAt', 'event.clientX', 'event.clientY', 'event.target.dataset.uri'],
    preventDefault: true,
  })
})

test('renderEventListeners isolates scrollbar pointer events from item selection and tracks drag events', () => {
  const eventListeners = renderEventListeners()
  expect(eventListeners).toContainEqual({
    name: 'handleScrollbarPointerDown',
    params: ['handleScrollBarPointerDown', 'event.clientY', 'event.pointerId'],
    preventDefault: true,
    stopPropagation: true,
    trackPointerEvents: ['handleScrollbarPointerMove', 'handleScrollbarPointerUp'],
  })
})
