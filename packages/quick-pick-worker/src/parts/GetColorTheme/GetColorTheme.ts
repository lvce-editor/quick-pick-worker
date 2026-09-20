import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getColorTheme = async (): Promise<string> => {
  try {
    return await RendererWorker.invoke('ColorTheme.getColorTheme')
  } catch {
    // The worker can be released before the renderer endpoint. Keep the
    // picker usable while older renderers are being upgraded.
    return ''
  }
}
