export interface SelectPickResult {
  // TODO use number
  readonly command: string
  readonly itemCommand?: string
  readonly itemCommandArgs?: readonly unknown[]
}
