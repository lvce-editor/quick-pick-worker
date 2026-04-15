import { expect, test } from '@jest/globals'
import { FileSearchWorker } from '@lvce-editor/rpc-registry'
import * as SearchFile from '../src/parts/SearchFile/SearchFile.ts'

test('searchFile forwards to file search worker', async () => {
  const invocations: any[] = []
  FileSearchWorker.set({
    invoke(method: string, ...params: readonly unknown[]) {
      invocations.push([method, ...params])
      return ['/test/file.txt']
    },
  } as any)

  const items = await SearchFile.searchFile('/test', 'test', true, '')

  expect(items).toEqual(['/test/file.txt'])
  expect(invocations).toEqual([['FileSearch.searchFile', '/test', 'test', true, '']])
})
