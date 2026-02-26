import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const getText = async (): Promise<string> => {
  // TODO
  const id = await RendererWorker.getActiveEditorId()
  const lines = await EditorWorker.getLines(id)
  return lines.join('\n')
}
