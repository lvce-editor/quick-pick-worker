import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as SearchFileModule from '../SearchFileModule/SearchFileModule.ts'

export const searchFile2 = async (path: string, value: string, prepare: boolean, assetDir: string): Promise<readonly string[]> => {
  const protocol = GetProtocol.getProtocol(path)
  // TODO call different providers depending on protocol
  const fn = SearchFileModule.getFn(protocol)
  if (!fn) {
    throw new Error(`No search handler registered for protocol: ${protocol}`)
  }
  const result = await fn(path, value, prepare, assetDir)
  return result
}
