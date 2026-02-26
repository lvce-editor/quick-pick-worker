import * as Close from '../Close/Close.ts'
import * as Create2 from '../Create2/Create2.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Dispose from '../Dispose/Dispose.ts'
import * as FocusFirst from '../FocusFirst/FocusFirst.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as FocusLast from '../FocusLast/FocusLast.ts'
import * as FocusNext from '../FocusNext/FocusNext.ts'
import * as FocusPrevious from '../FocusPrevious/FocusPrevious.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleBeforeInput from '../HandleBeforeInput/HandleBeforeInput.ts'
import * as HandleBlur from '../HandleBlur/HandleBlur.ts'
import * as HandleClickAt from '../HandleClickAt/HandleClickAt.ts'
import * as HandleFocus from '../HandleFocus/HandleFocus.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import { handleMessagePort } from '../HandleMessagePort/HandleMessagePort.ts'
import * as HandleWheel from '../HandleWheel/HandleWheel.ts'
import { initialize } from '../Initialize/Initialize.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as MenuEntriesState from '../MenuEntriesState/MenuEntriesState.ts'
import { executeCallback } from '../QuickPickCallbacks/QuickPickCallbacks.ts'
import * as WrapCommand from '../QuickPickStates/QuickPickStates.ts'
import { getCommandIds } from '../QuickPickStates/QuickPickStates.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SelectCurrentIndex from '../SelectCurrentIndex/SelectCurrentIndex.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'
import * as SelectItem from '../SelectItem/SelectItem.ts'
import * as SetValue from '../SetValue/SetValue.ts'
import { showQuickInput } from '../ShowQuickInput/ShowQuickInput.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'

export const commandMap = {
  'QuickPick.addMenuEntries': MenuEntriesState.add,
  'QuickPick.close': Close.close,
  'QuickPick.create2': Create2.create,
  'QuickPick.diff2': Diff2.diff2,
  'QuickPick.dispose': Dispose.dispose,
  'QuickPick.executeCallback': executeCallback,
  'QuickPick.focusFirst': WrapCommand.wrapCommand(FocusFirst.focusFirst),
  'QuickPick.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'QuickPick.focusLast': WrapCommand.wrapCommand(FocusLast.focusLast),
  'QuickPick.focusNext': WrapCommand.wrapCommand(FocusNext.focusNext),
  'QuickPick.focusPrevious': WrapCommand.wrapCommand(FocusPrevious.focusPrevious),
  'QuickPick.getCommandIds': getCommandIds,
  'QuickPick.getKeyBindings': GetKeyBindings.getKeyBindings,
  'QuickPick.handleBeforeInput': WrapCommand.wrapCommand(HandleBeforeInput.handleBeforeInput),
  'QuickPick.handleBlur': WrapCommand.wrapCommand(HandleBlur.handleBlur),
  'QuickPick.handleClickAt': WrapCommand.wrapCommand(HandleClickAt.handleClickAt),
  'QuickPick.handleFocus': WrapCommand.wrapCommand(HandleFocus.handleFocus),
  'QuickPick.handleInput': WrapCommand.wrapCommand(HandleInput.handleInput),
  'QuickPick.handleMessagePort': handleMessagePort,
  'QuickPick.handleWheel': WrapCommand.wrapCommand(HandleWheel.handleWheel),
  'QuickPick.initialize': initialize,
  'QuickPick.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'QuickPick.render2': Render2.render2,
  'QuickPick.renderEventListeners': RenderEventListeners.renderEventListeners,
  'QuickPick.selectCurrentIndex': WrapCommand.wrapCommand(SelectCurrentIndex.selectCurrentIndex),
  'QuickPick.selectIndex': WrapCommand.wrapCommand(SelectIndex.selectIndex),
  'QuickPick.selectItem': WrapCommand.wrapCommand(SelectItem.selectItem),
  'QuickPick.setDeltaY': WrapCommand.wrapCommand(VirtualList.setDeltaY),
  'QuickPick.setValue': WrapCommand.wrapCommand(SetValue.setValue),
  'QuickPick.showQuickInput': showQuickInput,
}
