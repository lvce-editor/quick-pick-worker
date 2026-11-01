import type { Rpc } from '@lvce-editor/rpc'

const state: { rpc?: Rpc } = {}

export const set = (value: Rpc): void => {
  state.rpc = value
}

export const invoke = <T>(method: string, ...args: unknown[]): Promise<T> => {
  if (!state.rpc) {
    throw new Error('Cache worker is not initialized')
  }
  return state.rpc.invoke(method, ...args) as Promise<T>
}
