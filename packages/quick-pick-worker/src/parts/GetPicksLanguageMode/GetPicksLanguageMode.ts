import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'

interface Language {
  readonly extensions?: readonly string[]
  readonly fileNames?: readonly string[]
  readonly id: string
  readonly tokenize?: string
}

interface LanguageModeValue {
  readonly languageId: string
  readonly tokenizePath: string
}

const getIconName = (language: Language): string => {
  const fileName = language.fileNames?.find((value) => typeof value === 'string')
  if (fileName) {
    return fileName
  }
  const extension = language.extensions?.find((value) => typeof value === 'string')
  if (!extension) {
    return ''
  }
  const normalizedExtension = extension.startsWith('.') ? extension : `.${extension}`
  return `file${normalizedExtension}`
}

const toProtoVisibleItem = (language: Language): ProtoVisibleItem => {
  const iconName = getIconName(language)
  const value: LanguageModeValue = {
    languageId: language.id,
    tokenizePath: language.tokenize || '',
  }
  return {
    description: '',
    direntType: iconName ? DirentType.File : DirentType.None,
    fileIcon: '',
    icon: '',
    iconName,
    label: language.id,
    matches: [],
    uri: iconName,
    value,
  }
}

const getUniqueLanguages = (languages: readonly any[]): readonly Language[] => {
  const seen = new Set<string>()
  const uniqueLanguages: Language[] = []
  for (const language of languages) {
    if (!language || typeof language.id !== 'string' || seen.has(language.id)) {
      continue
    }
    seen.add(language.id)
    uniqueLanguages.push(language)
  }
  uniqueLanguages.sort((a, b) => a.id.localeCompare(b.id))
  return uniqueLanguages
}

export const getPicks = async (_searchValue: string, _args?: any, { assetDir = '', platform = 0 } = {}): Promise<readonly ProtoVisibleItem[]> => {
  const languages = await ExtensionManagementWorker.getLanguages(platform, assetDir)
  return getUniqueLanguages(languages).map(toProtoVisibleItem)
}
