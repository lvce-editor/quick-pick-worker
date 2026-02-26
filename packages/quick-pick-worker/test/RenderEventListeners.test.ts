import { expect, test } from '@jest/globals'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.js'

test('renderEventListeners should return the correct event listeners', () => {
  const eventListeners = renderEventListeners()
  expect(eventListeners).toBeDefined()
})
