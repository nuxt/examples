import { basename } from 'node:path'
import { globby } from 'globby'
import { exec } from 'tinyexec'
import {consola} from 'consola'

const packages = await globby([
  'shared/**/package.json',
  'examples/**/package.json',
  '!**/node_modules',
  '!**/.nitro',
  '!**/.vercel',
  '!**/.output',
], { absolute: true })

for (const pkg of packages) {
  const cwd = pkg.replace('/package.json', '')
  const options = { nodeOptions: { cwd } }

  await exec('nuxi', ['prepare'], options)
  const res = await exec('tsc', ['--noEmit'], options)
  const output = (res.stderr).trim()
  if (output) {
    consola.withTag(basename(cwd)).error(output)
    process.exit(1)
  } else {
    consola.success('type checked', basename(cwd))
  }
}
