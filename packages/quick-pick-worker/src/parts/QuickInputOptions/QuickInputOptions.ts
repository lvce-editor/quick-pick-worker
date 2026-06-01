export interface QuickInputOptions {
  readonly id?: number
  readonly ignoreFocusOut?: boolean
  readonly initialValue?: string
  readonly render?: any
  readonly waitUntil?: 'visible' | 'finished'
}
