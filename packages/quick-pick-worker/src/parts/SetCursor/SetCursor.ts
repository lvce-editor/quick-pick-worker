import { RendererWorker } from '@lvce-editor/rpc-registry'

export const setCursor = async (rowIndex: number, columnIndex: number): Promise<void> => {
  await RendererWorker.invoke('Editor.cursorSet', rowIndex, columnIndex)
}
