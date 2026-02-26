import type { IGetPicks } from '../GetPicks/GetPicks.ts'
import type { SelectPick } from '../SelectPick/SelectPick.ts'
import * as Modules from '../QuickPickEntriesModules/QuickPickEntriesModules.ts'

const select: readonly SelectPick[] = Modules.selectPicks

const getPick: readonly IGetPicks[] = Modules.getPicks

export const getPicks = (id: number): IGetPicks => {
  const fn = getPick[id]
  return fn
}

export const getSelect = (id: number): SelectPick => {
  const fn = select[id]
  return fn
}
