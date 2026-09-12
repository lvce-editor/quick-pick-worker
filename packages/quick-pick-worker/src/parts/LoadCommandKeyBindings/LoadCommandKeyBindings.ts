import { RendererWorker } from '@lvce-editor/rpc-registry'
import { KeyCode } from '@lvce-editor/virtual-dom-worker'

const keyNames = new Map(Object.entries(KeyCode).map(([name, code]) => [code, name.replace(/^(Key|Digit)/, '')]))

export const getKeyLabel = (key: unknown): string => {
  if (typeof key === 'string') {
    return key
  }
  if (typeof key !== 'number' || !Number.isSafeInteger(key) || key <= 0) {
    return ''
  }
  const name = keyNames.get(key & 0xff)
  if (!name || name === 'Unknown') {
    return ''
  }
  return [
    ...(key & 2048 ? ['Ctrl'] : []),
    ...(key & 1024 ? ['Shift'] : []),
    ...(key & 512 ? ['Alt'] : []),
    ...(key & 256 ? ['Meta'] : []),
    name,
  ].join('+')
}

const loadUserKeyBindings = async (invoke: (method: string, ...args: readonly unknown[]) => Promise<any>): Promise<readonly any[]> => {
  try {
    const content = await invoke('FileSystem.readFile', 'app://keybindings.json')
    const parsed = JSON.parse(content)
    return Array.isArray(parsed)
      ? parsed.filter((entry) => entry && (entry.source === 'User' || (typeof entry.key === 'string' && !entry.source)))
      : []
  } catch {
    return []
  }
}

export const loadCommandKeyBindings = async (applicationId?: string): Promise<Readonly<Record<string, string>>> => {
  const invoke = (method: string, ...args: readonly unknown[]): Promise<any> =>
    applicationId === undefined
      ? RendererWorker.invoke(method, ...args)
      : RendererWorker.invoke('Application.execute', applicationId, method, ...args)
  try {
    if ((await invoke('Preferences.get', 'quickPick.showKeyBindings')) !== true) {
      return {}
    }
    const defaults = await invoke('KeyBindingsInitial.getKeyBindings')
    const user = await loadUserKeyBindings(invoke)
    const bindings: Record<string, string> = Object.create(null)
    for (const entry of [...user, ...defaults]) {
      const command = entry.command === 'ExtensionHost.executeCommand' ? `ext.${entry.args?.[0]}` : entry.command
      const label = getKeyLabel(entry.key)
      if (typeof command === 'string' && label && !Object.hasOwn(bindings, command)) {
        bindings[command] = label
      }
    }
    return bindings
  } catch {
    return {}
  }
}
