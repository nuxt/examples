export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const getURLForDeployment = (slug: string) =>
  process.env.DEPLOY_URL ? `${process.env.DEPLOY_URL}?force=${slug}` : `https://${slug}.example.nuxt.space/`
