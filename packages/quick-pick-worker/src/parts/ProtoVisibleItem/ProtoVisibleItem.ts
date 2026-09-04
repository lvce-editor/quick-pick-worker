export interface ProtoVisibleItem {
  readonly args?: readonly unknown[]
  readonly command?: string
  readonly description: string
  readonly direntType: number
  readonly fileIcon: string
  readonly icon: string
  readonly iconName?: string
  readonly label: string
  readonly matches: readonly number[]
  readonly uri: string
  readonly value?: unknown
}
