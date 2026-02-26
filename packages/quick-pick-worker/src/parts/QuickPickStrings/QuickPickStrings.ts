import * as I18NString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const noMatchingColorThemesFound = (): string => {
  return I18NString.i18nString(UiStrings.NoMatchingColorThemesFound)
}

export const selectColorTheme = (): string => {
  return I18NString.i18nString(UiStrings.SelectColorTheme)
}

export const pressEnterToGoToLine = (row: number, column: number): string => {
  return I18NString.i18nString(UiStrings.PressEnterToGoToLine, {
    PH1: row,
    PH2: column,
  })
}

export const typeNameofCommandToRun = (): string => {
  return I18NString.i18nString(UiStrings.TypeNameOfCommandToRun)
}

export const showAndRunCommands = (): string => {
  return I18NString.i18nString(UiStrings.ShowAndRunCommands)
}

export const noMatchingResults = (): string => {
  return I18NString.i18nString(UiStrings.NoMatchingResults)
}

export const files = (): string => {
  return I18NString.i18nString(UiStrings.Files)
}

export const goToFile = (): string => {
  return I18NString.i18nString(UiStrings.GoToFile)
}

export const noResults = (): string => {
  return I18NString.i18nString(UiStrings.NoResults)
}

export const selectToOpen = (): string => {
  return I18NString.i18nString(UiStrings.SelectToOpen)
}

export const openRecent = (): string => {
  return I18NString.i18nString(UiStrings.OpenRecent)
}

export const noRecentlyOpenedFoldersFound = (): string => {
  return I18NString.i18nString(UiStrings.NoRecentlyOpenedFoldersFound)
}

export const noSymbolFound = (): string => {
  return I18NString.i18nString(UiStrings.NoSymbolFound)
}

export const noWorkspaceSymbolsFound = (): string => {
  return I18NString.i18nString(UiStrings.NoWorkspaceSymbolsFound)
}

export const typeTheNameOfAViewToOpen = (): string => {
  return I18NString.i18nString(UiStrings.TypeTheNameOfAViewToOpen)
}

export const quickOpen = (): string => {
  return I18NString.i18nString(UiStrings.QuickOpen)
}

export const typeTheNameOfACommandToRun = (): string => {
  return I18NString.i18nString(UiStrings.TypeNameOfCommandToRun)
}

export const goToLineColumn = (): string => {
  return I18NString.i18nString(UiStrings.GoToLineColumn)
}

export const goToSymbolInEditor = (): string => {
  return I18NString.i18nString(UiStrings.GoToSymbolInEditor)
}

export const goToSymbolInWorkspace = (): string => {
  return I18NString.i18nString(UiStrings.GoToSymbolInWorkspace)
}

export const searchForText = (): string => {
  return I18NString.i18nString(UiStrings.SearchForText)
}

export const openView = (): string => {
  return I18NString.i18nString(UiStrings.OpenView)
}
