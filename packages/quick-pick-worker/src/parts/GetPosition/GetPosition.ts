export type Position = {
  readonly column: number
  readonly row: number
}

export const getPosition = (text: string, wantedColumn: number): Position => {
  let row = 0
  let column = 0
  for (let i = 0; i < wantedColumn; i++) {
    if (text[i] === '\n') {
      row++
      column = 0
    } else {
      column++
    }
  }
  return {
    column,
    row,
  }
}
