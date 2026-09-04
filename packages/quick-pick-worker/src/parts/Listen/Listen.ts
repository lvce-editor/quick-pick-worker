import * as CommandMap from '../CommandMap/CommandMap.ts'
import { commandMapRef } from '../CommandMapRef/CommandMapRef.ts'
import { initializeEditorWorker } from '../InitializeEditorWorker/InitializeEditorWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeFileSearchWorker } from '../InitializeFileSearchWorker/InitializeFileSearchWorker.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import { registerCommands } from '../QuickPickStates/QuickPickStates.ts'

export const listen = async (): Promise<void> => {
  Object.assign(commandMapRef, CommandMap.commandMap)
  registerCommands(CommandMap.commandMap)
  await Promise.all([initializeRendererWorker(), initializeEditorWorker(), initializeExtensionManagementWorker(), initializeFileSearchWorker()])
}
