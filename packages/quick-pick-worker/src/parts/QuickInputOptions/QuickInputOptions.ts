export interface QuickInputOptions {
  readonly id?: number
  readonly ignoreFocusOut?: boolean
  readonly initialItems?: readonly unknown[]
  readonly initialValue?: string
  readonly render?: any
  readonly waitUntil?: 'visible' | 'finished'
}
