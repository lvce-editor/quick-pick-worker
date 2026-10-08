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
    const entries: readonly { label: string }[] = await RendererWorker.invoke('Layout.getAllQuickPickMenuEntries')
    return entries ? entries.toSorted((a, b) => a.label.localeCompare(b.label)) : []
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
