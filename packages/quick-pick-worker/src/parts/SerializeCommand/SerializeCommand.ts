import type { WrappedFn } from '@lvce-editor/viewlet-registry'

const queues = new Map<number, Promise<void>>()

export const serialize = (command: WrappedFn): WrappedFn => {
  return async (uid, ...args): Promise<void> => {
    const previous = queues.get(uid) || Promise.resolve()
    const run = async (): Promise<void> => {
      try {
        await previous
      } catch {
        // The previous caller receives its error; later commands must still run.
      }
      await command(uid, ...args)
    }
    const current = run()
    queues.set(uid, current)
    try {
      await current
    } finally {
      if (queues.get(uid) === current) {
        queues.delete(uid)
      }
    }
  }
}
