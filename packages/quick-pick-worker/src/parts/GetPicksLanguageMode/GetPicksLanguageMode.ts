import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

interface Language {
  readonly id: string
  readonly tokenize?: string
}

interface LanguageModeValue {
  readonly languageId: string
  readonly tokenizePath: string
}

const toProtoVisibleItem = (language: Language): ProtoVisibleItem => {
  const value: LanguageModeValue = {
    languageId: language.id,
    tokenizePath: language.tokenize || '',
  }
  return {
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: language.id,
    matches: [],
    uri: '',
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
