let rpc: any

export const set = (newRpc: any): void => {
  rpc = newRpc
}

export const invoke = (method: string, ...args: readonly unknown[]): Promise<unknown> => {
  return rpc.invoke(method, ...args)
}

export const registerMockRpc = (commandMap: Record<string, (...args: readonly any[]) => any>): { invocations: unknown[][]; [Symbol.dispose]: () => void } => {
  const oldRpc = rpc
  const invocations: unknown[][] = []
  rpc = {
    invoke(command: string, ...args: readonly unknown[]): unknown {
      invocations.push([command, ...args])
      return commandMap[command](...args)
    },
  }
  return {
    invocations,
    [Symbol.dispose](): void {
      rpc = oldRpc
    },
  }
}
