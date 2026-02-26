export interface SearchFileHandler {
  (path: string, value: string, prepare: boolean, assetDir: string): Promise<readonly string[]>
}
