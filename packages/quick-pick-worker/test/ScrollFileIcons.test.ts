import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import * as VirtualList from '../src/parts/VirtualList/VirtualList.ts'

test.each(['wheel', 'scrollbar'])('%s scrolling keeps rendered file icons aligned with the visible files', async (method) => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-${name}`,
  })
  const items = ['a.json', 'b.ts', 'c.css', 'd.html', 'e.js', 'f.md', 'g.txt', 'h.xml', 'i.svg', 'j.png'].map((label) => ({
    description: '',
    direntType: DirentType.File,
    fileIcon: '',
    icon: '',
    label,
    matches: [],
    uri: `/${label}`,
  }))
  const state = {
    ...CreateDefaultState.createDefaultState(),
    fileIconCache: { '/a.json': 'icon-a.json', '/b.ts': 'icon-b.ts' },
    finalDeltaY: 240,
    height: 98,
    icons: ['icon-a.json', 'icon-b.ts'],
    itemHeight: 30,
    items,
    maxLineY: 2,
    maxVisibleItems: 2,
  }
  const scrolled =
    method === 'wheel'
      ? await VirtualList.handleWheel(state, 0, 30)
      : await VirtualList.handleScrollBarPointerMove(await VirtualList.handleScrollBarPointerDown(state, 88, 1), 91.5, 1)
  const dom = RenderItems.renderItemsDom(scrolled)
  expect(dom.filter((node) => node.className === 'FileIcon').map((node) => node.src)).toEqual(['icon-b.ts', 'icon-c.css'])
  expect(mockRpc.invocations).toEqual([['IconTheme.getFileIcon', { name: 'c.css' }]])
  const restored = await VirtualList.handleWheel(scrolled, 0, -30)
  expect(restored.icons).toEqual(state.icons)
  expect(mockRpc.invocations).toHaveLength(1)
})
