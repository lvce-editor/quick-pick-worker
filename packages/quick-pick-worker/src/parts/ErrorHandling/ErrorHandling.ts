import { RendererWorker } from '@lvce-editor/rpc-registry'

export const handleError = async (error: any, notify = true, prefix = ''): Promise<void> => {
  console.error(error)
}

export const showErrorDialog = async (error: any): Promise<void> => {
  const { code } = error
  const { message } = error
  const { stack } = error
  const { name } = error
  const errorInfo = {
    code,
    message,
    name,
    stack,
  }
  await RendererWorker.showErrorDialog(errorInfo)
}

export const warn = (...args: readonly unknown[]): void => {
  console.warn(...args)
}
