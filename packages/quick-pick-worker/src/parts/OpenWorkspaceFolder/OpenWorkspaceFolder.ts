import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openWorkspaceFolder = (uri: string): Promise<void> => {
  const command = uri.includes('://') ? 'Workspace.setUri' : 'Workspace.setPath'
  return RendererWorker.invoke(command, uri)
}
