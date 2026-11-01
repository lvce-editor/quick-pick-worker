import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

export interface GoToLinePosition {
  readonly columnIndex: number
  readonly rowIndex: number
}

export const parseGoToLinePosition = (value: string): GoToLinePosition | undefined => {
  const [lineString, columnString = '1'] = value.slice(QuickPickPrefix.GoToLine.length).split(':')
  const line = Number(lineString)
  const column = Number(columnString)
  if (!Number.isSafeInteger(line) || !Number.isSafeInteger(column) || line < 1 || column < 1) {
    return undefined
  }
  return {
    columnIndex: column - 1,
    rowIndex: line - 1,
  }
}
