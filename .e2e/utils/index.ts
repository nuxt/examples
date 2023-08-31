export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const getSettingsForDeployment = (slug: string) => ({
  baseURL: process.env.DEPLOY_URL || `https://${slug}.example.nuxt.space/`,
  extraHTTPHeaders: { 'cookie': `forced=${slug}` }
})
