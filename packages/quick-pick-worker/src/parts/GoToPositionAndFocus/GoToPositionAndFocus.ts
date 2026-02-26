import { RendererWorker } from '@lvce-editor/rpc-registry'
import { setCursor } from '../SetCursor/SetCursor.ts'

export const goToPositionAndFocus = async (rowIndex: number, columnIndex: number): Promise<void> => {
  await setCursor(rowIndex, columnIndex)
  await RendererWorker.invoke('Editor.handleFocus')
}
