// TODO this should be in FileSystem module
export const pathBaseName = (path: string): string => {
  return path.slice(path.lastIndexOf('/') + 1)
}

// TODO this should be in FileSystem module
export const pathDirName = (path: string): string => {
  const pathSeparator = '/'
  const index = path.lastIndexOf(pathSeparator)
  if (index === -1) {
    return ''
  }
  return path.slice(0, index)
}
