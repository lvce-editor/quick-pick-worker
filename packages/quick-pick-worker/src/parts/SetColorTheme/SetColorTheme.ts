import { RendererWorker } from '@lvce-editor/rpc-registry'

export const setColorTheme = (id: string): Promise<void> => {
  return RendererWorker.invoke(/* ColorTheme.setColorTheme */ 'ColorTheme.setColorTheme', /* colorThemeId */ id)
}
