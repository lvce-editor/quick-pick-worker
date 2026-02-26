import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

export const parseGotoline = (value: string): number => {
  const lineString = value.slice(QuickPickPrefix.GoToLine.length)
  const wantedLine = Number.parseInt(lineString, 10)
  if (Number.isNaN(wantedLine)) {
    return -1
  }
  return wantedLine
}
