import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import { rankCommandPicks } from '../src/parts/RankCommandPicks/RankCommandPicks.ts'

test('prefers word boundaries and considers later contiguous occurrences', () => {
  const items: readonly ProtoVisibleItem[] = ['Passh', 'Passh: SSH', 'Remote SSH'].map((label) => ({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label,
    matches: [10],
    uri: '',
  }))
  expect(rankCommandPicks(items, 'ssh').map((item) => item.label)).toEqual(['Passh: SSH', 'Remote SSH', 'Passh'])
})
