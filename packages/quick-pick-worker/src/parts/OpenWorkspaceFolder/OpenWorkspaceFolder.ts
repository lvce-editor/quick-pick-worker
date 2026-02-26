import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openWorkspaceFolder = (uri: string): Promise<void> => {
  return RendererWorker.invoke(/* Workspace.setPath */ 'Workspace.setPath', /* path */ uri)
}
