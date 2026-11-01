const state: { rpc: any } = {
  rpc: undefined,
}

export const set = (newRpc: any): void => {
  state.rpc = newRpc
}

export const invoke = (method: string, ...args: readonly unknown[]): Promise<unknown> => {
  return state.rpc.invoke(method, ...args)
}

export const registerMockRpc = (
  commandMap: Record<string, (...args: readonly any[]) => any>,
): { invocations: unknown[][]; [Symbol.dispose]: () => void } => {
  const oldRpc = state.rpc
  const invocations: unknown[][] = []
  state.rpc = {
    invoke(command: string, ...args: readonly unknown[]): unknown {
      invocations.push([command, ...args])
      return commandMap[command](...args)
    },
  }
  return {
    invocations,
    [Symbol.dispose](): void {
      state.rpc = oldRpc
    },
  }
}
