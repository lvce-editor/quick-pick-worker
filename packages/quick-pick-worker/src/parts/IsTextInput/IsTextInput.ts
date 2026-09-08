export const isTextInput = (args: readonly unknown[]): boolean => {
  const options = args.at(-1) as { readonly type?: string } | undefined
  return options?.type === 'text'
}
