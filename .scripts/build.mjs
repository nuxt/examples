import fsp from 'node:fs/promises'
import { globby } from 'globby'
import { readPackageJSON } from 'pkg-types'
import { join, resolve } from 'pathe'

const stringify = contents => JSON.stringify(contents, null, 2)

const packages = await globby([
  'examples/**/package.json',
  '!**/node_modules',
  '!**/.nitro',
  '!**/.vercel',
  '!**/.output',
]).then(r => r.sort())
const names = new Set()

await fsp.rm('.vercel/output', { recursive: true, force: true })

// Create public files
await fsp.mkdir('.vercel/output/static', { recursive: true })
await fsp.mkdir('.vercel/output/functions', { recursive: true })
for (const config of packages) {
  const { name } = await readPackageJSON(resolve(config))
  const output = resolve(config, '../.vercel/output')
  try {
    const stats = await fsp.stat(output)
    if (!stats.isDirectory()) continue
  }
  catch {
    continue
  }

  await fsp.cp(join(output, 'static'), `.vercel/output/static/${name}`, {
    recursive: true,
  })
  await fsp.cp(
    join(output, 'functions/__nitro.func'),
    `.vercel/output/functions/${name}.func`,
    {
      recursive: true,
    },
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
  const forced = req.url.match(/\\?force=(.*)$/)?.[1]
  const hostname = req.headers.get('host')
  const subdomain = forced || req.headers.get('cookie')?.match(/forced=([^;]*)(;|$)/)?.[1] || hostname.split('.').shift()

  if (names.includes(subdomain)) {
    const response = new Response()
    const url = new URL(req.url)
    response.headers.set('x-middleware-rewrite', '/' + subdomain + url.pathname)
    if (forced) {
      response.headers.set('set-cookie', \`forced=$\{forced}\`)
    }
    return response
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: 'https://nuxt.com/docs/examples/essentials/hello-world/'
    }
  })

}`,
)
await fsp.writeFile(
  '.vercel/output/functions/_middleware.func/.vc-config.json',
  stringify({
    runtime: 'edge',
    entrypoint: 'index.js',
  }),
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
      ...[...names].map(name => ({
        src: `/${name}/(.*)`,
        dest: `/${name}`,
      })),
    ],
  }),
)

console.log('Successfully built nuxt/examples:')
let index = 0
const README = await fsp.readFile('README.md', 'utf-8')
const missingPackages = []
for (const name of names) {
  const treeChar = index++ === names.size - 1 ? '└─' : '├─'
  process.stdout.write(`  ${treeChar} ${name}\n`)
  if (!README.includes(`https://${name}.example.nuxt.space`)) {
    missingPackages.push(name)
  }
}

if (missingPackages.length) {
  throw new Error(`Packages not found in README: ${missingPackages.join(', ')}`)
}
