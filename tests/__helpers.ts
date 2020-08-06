import {
  createTestContext as originalCreateTestContext,
  TestContext,
} from 'nexus/testing'

export function createTestContext() {
  let ctx = {} as TestContext

  beforeAll(async () => {
    Object.assign(ctx, await originalCreateTestContext())
    await ctx.app.start() // 4
  })

  afterAll(async () => {
    await ctx.app.stop() // 5
  })

  return ctx
}
