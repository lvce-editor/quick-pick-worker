import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetPicksColorTheme from '../src/parts/GetPicksColorTheme/GetPicksColorTheme.ts'

test('getPicks returns color theme names as picks', async () => {
  const colorThemeNames = ['dark-plus', 'light-plus', 'monokai']
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => colorThemeNames,
  })

  const result = await GetPicksColorTheme.getPicks('')

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'dark-plus',
    matches: [],
    uri: '',
  })
  expect(result[1].label).toBe('light-plus')
  expect(result[2].label).toBe('monokai')
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('getPicks returns empty array when no color themes', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => [],
  })

  const result = await GetPicksColorTheme.getPicks('search')

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})
