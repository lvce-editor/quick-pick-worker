export const TokenMap = {
  1: 'Xyz',
}

export const hasArrayReturn = true

export const initialLineState = {
  state: 1,
}

export const tokenizeLine = (line) => {
  return {
    state: 1,
    tokens: [1, line.length],
  }
}
