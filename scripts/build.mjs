import fsp from 'node:fs/promises'
import { globby } from 'globby'
import { readPackageJSON } from 'pkg-types'
import { resolve } from 'pathe'

const stringify = contents => JSON.stringify(contents, null, 2)

const packages = await globby('examples/**/nuxt.config.*')
const names = new Set()

await fsp.rm('.output', { recursive: true, force: true })

// Create public files
await fsp.mkdir('.vercel/output/static', { recursive: true })
for (const config of packages) {
  const { name } = await readPackageJSON(resolve(config))
  const output = resolve(config, '../.output/public')
  try {
    const stats = await fsp.stat(output)
    if (!stats.isDirectory()) continue
  } catch {
    continue
  }

  await fsp.cp(
    resolve(config, '../.output/public'),
    `.vercel/output/static/${name}`,
    {
      recursive: true,
    }
  )
  names.add(name)
}

// Create middleware
await fsp.mkdir('.vercel/output/functions/_middleware.func', {
  recursive: true,
})
await fsp.writeFile(
  '.vercel/output/functions/_middleware.func/index.js',
  `
const names = ${stringify([...names])}

export default function middleware(req) {
  const hostname = req.headers.get('host')
  const subdomain = hostname.split('.').shift()

  
  if (names.includes(subdomain)) {
    const response = new Response()
    const url = new URL(req.url)
    response.headers.set('x-middleware-rewrite', '/' + subdomain + url.pathname)
    return response
  }
  
  return new Response(null, {
    status: 307,
    headers: {
      Location: 'https://v3.nuxtjs.org/examples/essentials/hello-world/'
    }
  })
  
}`
)
await fsp.writeFile(
  '.vercel/output/functions/_middleware.func/.vc-config.json',
  stringify({
    runtime: 'edge',
    entrypoint: 'index.js',
  })
)
await fsp.writeFile(
  '.vercel/output/config.json',
  stringify({
    version: 3,
    routes: [
      {
        src: '/(.*)',
        middlewarePath: '_middleware',
        continue: true,
      },
      {
        handle: 'filesystem',
      },
    ],
  })
)
