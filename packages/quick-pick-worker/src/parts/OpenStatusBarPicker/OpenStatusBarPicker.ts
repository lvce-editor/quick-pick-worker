import * as ApplicationRendererRpc from '../ApplicationRendererRpc/ApplicationRendererRpc.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const openStatusBarPicker = async (picker: string, ...args: readonly unknown[]): Promise<void> => {
  await ApplicationRendererRpc.invoke(undefined, 'Viewlet.openWidget', ViewletModuleId.QuickPick, picker, ...args)
}
