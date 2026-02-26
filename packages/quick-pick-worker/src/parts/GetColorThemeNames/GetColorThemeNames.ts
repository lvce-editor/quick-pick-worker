import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getColorThemeNames = async (assetDir: string, platform: number): Promise<readonly string[]> => {
  return RendererWorker.invoke('ColorTheme.getColorThemeNames', assetDir, platform)
}
