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
