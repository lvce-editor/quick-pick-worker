import { RendererWorker } from '@lvce-editor/rpc-registry'

export const invoke = async (applicationId: string | undefined, method: string, ...args: readonly unknown[]): Promise<any> => {
  return applicationId === undefined
    ? RendererWorker.invoke(method, ...args)
    : RendererWorker.invoke('Application.execute', applicationId, method, ...args)
}
