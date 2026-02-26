import { RendererWorker } from '@lvce-editor/rpc-registry'

interface MenuEntriesState {
  menuEntries: readonly unknown[]
}

const state: MenuEntriesState = {
  menuEntries: [],
}

export const getAll = async (): Promise<readonly unknown[]> => {
  try {
    // @ts-ignore
    const entries = await RendererWorker.invoke('Layout.getAllQuickPickMenuEntries')
    return entries || []
  } catch {
    // ignore
  }
  return state.menuEntries
}

export const add = (menuEntries: readonly unknown[]): void => {
  state.menuEntries = [...state.menuEntries, ...menuEntries]
}

export const clear = (): void => {
  state.menuEntries = []
}
