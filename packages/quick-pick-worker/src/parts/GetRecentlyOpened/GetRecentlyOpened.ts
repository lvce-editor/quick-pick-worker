import { RendererWorker } from '@lvce-editor/rpc-registry'

const getUriKey = (uri: string): string => {
  if (!uri.startsWith('/') && !uri.startsWith('file://')) {
    return uri
  }
  try {
    const url = new URL(uri.startsWith('/') ? `file://${uri}` : uri)
    while (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.slice(0, -1)
    }
    return url.href
  } catch {
    return uri
  }
}

const uniq = (array: readonly string[]): readonly string[] => {
  const seen = new Set<string>()
  return array.filter((uri) => {
    const key = getUriKey(uri)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

export const getRecentlyOpened = async (): Promise<readonly string[]> => {
  const recentlyOpened = (await RendererWorker.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')) as readonly string[]
  return uniq(recentlyOpened)
}
