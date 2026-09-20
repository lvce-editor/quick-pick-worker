import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getHomeDir = async (): Promise<string> => {
  try {
    const homeDir = await RendererWorker.invoke('Workspace.getHomeDir')
    return typeof homeDir === 'string' ? homeDir : ''
  } catch {
    return ''
  }
}
