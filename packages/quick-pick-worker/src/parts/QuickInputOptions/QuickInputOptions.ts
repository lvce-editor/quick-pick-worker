export interface QuickInputOptions {
  readonly id?: number
  readonly ignoreFocusOut?: boolean
  readonly initialValue?: string
  readonly initialItems?: readonly unknown[]
  readonly render?: any
  readonly waitUntil?: 'visible' | 'finished'
}
