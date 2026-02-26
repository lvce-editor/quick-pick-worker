import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getWorkspacePath = async (): Promise<string> => {
  return RendererWorker.invoke('Workspace.getPath')
}
