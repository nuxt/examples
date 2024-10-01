import { defineEventHandler, defineLazyEventHandler } from 'h3'

export default defineLazyEventHandler(async () => {
  // @ts-expect-error TODO: https://github.com/nuxt/nuxt/issues/14131
  const { sum } = await import('~/server/wasm/sum.wasm')

  return defineEventHandler((event) => {
    const { a = 0, b = 0 } = getQuery(event)
    return { sum: sum(a, b) }
  })
})
