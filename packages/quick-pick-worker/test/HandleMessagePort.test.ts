import { expect, test } from '@jest/globals'
import { handleMessagePort } from '../src/parts/HandleMessagePort/HandleMessagePort.ts'

test('creates PlainMessagePortRpc with message port', async () => {
  const { port1 } = new MessageChannel()
  await expect(handleMessagePort(port1)).resolves.toBeUndefined()
  port1.close()
})

test('handles message port correctly', async () => {
  const { port1 } = new MessageChannel()
  await expect(handleMessagePort(port1)).resolves.toBeUndefined()
  port1.close()
})
