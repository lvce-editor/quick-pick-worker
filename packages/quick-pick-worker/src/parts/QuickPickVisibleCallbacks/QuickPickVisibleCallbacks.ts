const callbacks: (() => void)[] = []

export const waitUntilVisible = (): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers<void>()
  callbacks.push(resolve)
  return promise
}

export const notifyVisible = (): void => {
  const pendingCallbacks = callbacks.splice(0)
  for (const callback of pendingCallbacks) {
    callback()
  }
}
