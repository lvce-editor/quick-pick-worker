import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderCss from '../src/parts/RenderCss/RenderCss.ts'

const createItems = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item-${index}`,
    matches: [],
    uri: `/item-${index}`,
  }))
}

test('renderCss returns stylesheet command', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 20,
    finalDeltaY: 100,
    headerHeight: 30,
    height: 100,
    itemHeight: 10,
    items: createItems(20),
    minimumSliderSize: 5,
    uid: 7,
  }
  expect(RenderCss.renderCss(oldState, newState)).toEqual([
    'Viewlet.setCss',
    7,
    `.QuickPick {
  --QuickPickItemsHeight: 100px;
  --ScrollBarThumbHeight: 50px;
  --ScrollBarThumbTop: 4px;
}
.QuickPick .QuickPickItems {
  height: var(--QuickPickItemsHeight);
}
.QuickPick .ScrollBarThumb {
  height: var(--ScrollBarThumbHeight);
  translate: 0px var(--ScrollBarThumbTop);
}`,
  ])
})

test('renderCss uses fallback height when quick pick height is 0', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    height: 0,
  }
  const result = RenderCss.renderCss(oldState, newState)
  expect(result).toEqual([
    'Viewlet.setCss',
    1,
    `.QuickPick {
  --QuickPickItemsHeight: 20px;
  --ScrollBarThumbHeight: 0px;
  --ScrollBarThumbTop: 0px;
}
.QuickPick .QuickPickItems {
  height: var(--QuickPickItemsHeight);
}
.QuickPick .ScrollBarThumb {
  height: var(--ScrollBarThumbHeight);
  translate: 0px var(--ScrollBarThumbTop);
}`,
  ])
})