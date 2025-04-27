import { basename } from 'node:path'
import { glob } from 'tinyglobby'
import { exec } from 'tinyexec'
import { consola } from 'consola'

const packages = await glob([
  'shared/**/package.json',
  'examples/**/package.json',
  '!**/node_modules',
  '!**/.nitro',
  '!**/.vercel',
  '!**/.output',
], { absolute: true })

for (const pkg of packages) {
  const cwd = pkg.replace('/package.json', '')

  await exec('nuxi', ['prepare'], { nodeOptions: { cwd }, throwOnError: true })
  const res = await exec('vue-tsc', ['--noEmit'], { nodeOptions: { cwd } })
  if (res.exitCode !== 0) {
    consola.withTag(basename(cwd)).error(res.stdout.trim())
    process.exit(1)
  }
  else {
    consola.success('type checked', basename(cwd))
  }
}
