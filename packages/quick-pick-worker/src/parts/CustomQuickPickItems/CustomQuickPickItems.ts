import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'

const idState = {
  value: 0,
}

export const add = (items: readonly unknown[]): number => {
  const nextId = ++idState.value
  state.items[nextId] = items
  return nextId
}

export const get = (id: number): readonly unknown[] => {
  return state.items[id] || []
}

export const remove = (id: number): void => {
  delete state.items[id]
}
