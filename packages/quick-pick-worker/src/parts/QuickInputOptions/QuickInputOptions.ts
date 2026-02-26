export interface QuickInputOptions {
  readonly ignoreFocusOut?: boolean
  readonly initialValue?: string
  readonly render?: any
  readonly waitUntil?: 'visible' | 'finished'
}
