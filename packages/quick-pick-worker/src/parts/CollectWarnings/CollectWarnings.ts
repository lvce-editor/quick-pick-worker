interface QuickPickItem {
  readonly id?: unknown
  readonly label?: unknown
}

const getCommandName = (item: QuickPickItem, property: 'id' | 'label'): string => {
  const value = item[property]
  return typeof value === 'string' && value ? value : '<unknown>'
}

const getWarning = (items: readonly QuickPickItem[], property: 'id' | 'label', nameProperty: 'id' | 'label'): string => {
  const commandName = getCommandName(items[0], nameProperty)
  if (items.length === 1) {
    return `command ${commandName} has missing ${property}`
  }
  const otherCount = items.length - 1
  const otherCommands = otherCount === 1 ? 'command' : 'commands'
  return `command ${commandName} and ${otherCount} other ${otherCommands} have missing ${property}`
}

export const collectWarnings = (items: readonly QuickPickItem[]): readonly string[] => {
  const warnings: string[] = []
  const missingLabels = items.filter((item) => !item.label)
  const missingIds = items.filter((item) => !item.id)

  if (missingLabels.length > 0) {
    warnings.push(getWarning(missingLabels, 'label', 'id'))
  }
  if (missingIds.length > 0) {
    warnings.push(getWarning(missingIds, 'id', 'label'))
  }

  return warnings
}
