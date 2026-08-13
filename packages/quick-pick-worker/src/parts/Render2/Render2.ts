import { ViewletCommand } from '@lvce-editor/constants'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

const isFocusContextCommand = (command: unknown): boolean => {
  return Array.isArray(command) && command[0] === ViewletCommand.SetFocusContext
}

const renderDirect = async (uid: number, commands: readonly unknown[]): Promise<readonly unknown[]> => {
  const rendererWorkerCommands = commands.filter(isFocusContextCommand)
  const rendererProcessCommands = commands.filter((command) => !isFocusContextCommand(command))
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, rendererProcessCommands)
  return [...rendererWorkerCommands, ['Viewlet.commitPending', uid, transactionId]]
}

export const render2 = (uid: number, diffResult: readonly number[]): readonly unknown[] | Promise<readonly unknown[]> => {
  const { newState, oldState } = QuickPickStates.get(uid)
  if (oldState === newState) {
    return []
  }
  QuickPickStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  if (!RendererProcess.isConnected()) {
    return commands
  }
  return renderDirect(uid, commands)
}
