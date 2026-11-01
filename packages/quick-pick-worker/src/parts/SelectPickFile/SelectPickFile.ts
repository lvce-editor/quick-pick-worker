import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import * as OpenUri from '../OpenUri/OpenUri.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

const toFileUri = (path: string): string => {
  // Preserve already-qualified URIs, but treat Windows drive letters as paths.
  if (/^[a-z][a-z\d+.-]*:/i.test(path) && !/^[a-z]:[\\/]/i.test(path)) {
    return path
  }

  const url = new URL('file:///')
  url.pathname = path.replaceAll('\\', '/').replaceAll('%', '%25')
  return url.href
}

export const selectPick = async (pick: ProtoVisibleItem): Promise<SelectPickResult> => {
  await OpenUri.openUri(toFileUri(pick.uri))
  return {
    command: QuickPickReturnValue.Hide,
  }
}
