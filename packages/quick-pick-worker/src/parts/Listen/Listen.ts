import * as CommandMap from '../CommandMap/CommandMap.ts'
import { commandMapRef } from '../CommandMapRef/CommandMapRef.ts'
import { initializeEditorWorker } from '../InitializeEditorWorker/InitializeEditorWorker.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import { registerCommands } from '../QuickPickStates/QuickPickStates.ts'
import * as SearchFileModule from '../SearchFileModule/SearchFileModule.ts'
import * as SearchModules from '../SearchModules/SearchModules.ts'

export const listen = async (): Promise<void> => {
  Object.assign(commandMapRef, CommandMap.commandMap)
  registerCommands(CommandMap.commandMap)
  SearchFileModule.register(SearchModules.searchModules)
  await Promise.all([initializeRendererWorker(), initializeEditorWorker()])
}
