export interface DomEventListener {
  readonly name: string
  readonly params: readonly string[]
  readonly passive?: boolean
  readonly preventDefault?: boolean
}
