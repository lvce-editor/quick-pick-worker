import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getColorTheme = async (): Promise<string> => {
  return RendererWorker.invoke('ColorTheme.getColorTheme')
}
