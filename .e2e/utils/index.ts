import type { BrowserContext, Fixtures, PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs } from '@playwright/test'
import { withoutProtocol } from 'ufo'

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const getSettingsForDeployment = (slug: string): Fixtures<{}, {}, PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs> => ({
  baseURL: process.env.DEPLOY_URL || `https://${slug}.example.nuxt.space/`,
  extraHTTPHeaders: { cookie: `forced=${slug}` },
})

export async function addForcedCookie(context: BrowserContext, slug: string) {
  return addCookies(context, slug, [{ name: 'forced', value: slug }])
}

export async function addCookies(context: BrowserContext, slug: string, cookies: Array<{ name: string, value: string }>) {
  const domain = withoutProtocol(process.env.DEPLOY_URL || `https://${slug}.example.nuxt.space`)
  await context.addCookies(cookies.map(c => ({
    name: c.name,
    value: c.value,
    domain,
    path: '/',
  })).concat([{ name: 'forced', value: slug, domain, path: '/' }]))
}
