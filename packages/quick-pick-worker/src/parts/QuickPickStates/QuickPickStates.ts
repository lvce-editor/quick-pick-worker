import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const { dispose, get, getCommandIds, registerCommands, set, wrapAsyncCommand, wrapCommand } = ViewletRegistry.create<QuickPickState>()
