import type { SearchFileHandler } from '../SearchFileHandler/SearchFileHandler.ts'

const state: Record<string, SearchFileHandler> = Object.create(null)

export const register = (modules: Record<string, SearchFileHandler>): void => {
  Object.assign(state, modules)
}

export const getFn = (protocol: string): SearchFileHandler => {
  return state[protocol]
}
