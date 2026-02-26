const RE_PROTOCOL = /^([a-z-]+):\/\//

export const getProtocol = (uri: string): string => {
  const protocolMatch = uri.match(RE_PROTOCOL)
  if (protocolMatch) {
    return protocolMatch[1]
  }
  return ''
}
