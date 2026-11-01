const state = {
  value: 0,
}

export const create = (): number => {
  return ++state.value
}
