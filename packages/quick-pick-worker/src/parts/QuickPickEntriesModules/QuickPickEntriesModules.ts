import type { IGetPicks } from '../GetPicks/GetPicks.ts'
import type { SelectPick } from '../SelectPick/SelectPick.ts'
import * as GetPicksColorTheme from '../GetPicksColorTheme/GetPicksColorTheme.ts'
import * as GetPicksCommand from '../GetPicksCommand/GetPicksCommand.ts'
import * as GetPicksCustom from '../GetPicksCustom/GetPicksCustom.ts'
import * as GetPicksFile from '../GetPicksFile/GetPicksFile.ts'
import * as GetPicksGoToColumn from '../GetPicksGoToColumn/GetPicksGoToColumn.ts'
import * as GetPicksGoToLine from '../GetPicksGoToLine/GetPicksGoToLine.ts'
import * as GetPicksHelp from '../GetPicksHelp/GetPicksHelp.ts'
import * as GetPicksOpenRecent from '../GetPicksOpenRecent/GetPicksOpenRecent.ts'
import * as GetPicksSymbol from '../GetPicksSymbol/GetPicksSymbol.ts'
import * as GetPicksView from '../GetPicksView/GetPicksView.ts'
import * as GetPicksWorkspaceSymbol from '../GetPicksWorkspaceSymbol/GetPicksWorkspaceSymbol.ts'
import * as SelectPickColorTheme from '../SelectPickColorTheme/SelectPickColorTheme.ts'
import * as SelectPickCommand from '../SelectPickCommand/SelectPickCommand.ts'
import * as SelectPickCustom from '../SelectPickCustom/SelectPickCustom.ts'
import * as SelectPickFile from '../SelectPickFile/SelectPickFile.ts'
import * as SelectPickGoToColumn from '../SelectPickGoToColumn/SelectPickGoToColumn.ts'
import * as SelectPickGoToLine from '../SelectPickGoToLine/SelectPickGoToLine.ts'
import * as SelectPickHelp from '../SelectPickHelp/SelectPickHelp.ts'
import * as SelectPickRecent from '../SelectPickRecent/SelectPickRecent.ts'
import * as SelectPickSymbol from '../SelectPickSymbol/SelectPickSymbol.ts'
import * as SelectPickView from '../SelectPickView/SelectPickView.ts'
import * as SelectPickWorkspaceSymbol from '../SelectPickWorkspaceSymbol/SelectPickWorkspaceSymbol.ts'

export const selectPicks: readonly SelectPick[] = [
  SelectPickColorTheme.selectPick,
  SelectPickCommand.selectPick,
  SelectPickCustom.selectPick,
  SelectPickFile.selectPick,
  SelectPickGoToColumn.selectPickGoToColumn,
  SelectPickGoToLine.selectPick,
  SelectPickHelp.selectPick,
  SelectPickRecent.selectPick,
  SelectPickSymbol.selectPick,
  SelectPickView.selectPick,
  SelectPickWorkspaceSymbol.selectPick,
]

export const getPicks: readonly IGetPicks[] = [
  GetPicksColorTheme.getPicks,
  GetPicksCommand.getPicks,
  GetPicksCustom.getPicks,
  GetPicksFile.getPicks,
  GetPicksGoToColumn.getPicksGoToColumn,
  GetPicksGoToLine.getPicks,
  GetPicksHelp.getPicks,
  GetPicksOpenRecent.getPicks,
  GetPicksSymbol.getPicks,
  GetPicksView.getPicks,
  GetPicksWorkspaceSymbol.getPicks,
]
