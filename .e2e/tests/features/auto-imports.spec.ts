import { test, expect } from '@playwright/test'
import { getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('auto-imports'))
test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)
})

test('Heading is visible', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Demo with auto imports' }),
  ).toBeVisible()
})

test('Alert shows "Hello NUXT!" without editing the input', async ({
  page,
}) => {
  page.once('dialog', (dialog) => {
    expect(dialog.message()).toBe('Hello NUXT!')
    dialog.dismiss()
  })
  await page.getByRole('button', { name: 'Hello' }).click()
})

test('Alert shows the right message when the input has been edited', async ({
  page,
}) => {
  await page.getByRole('textbox').fill('Test')
  page.once('dialog', (dialog) => {
    expect(dialog.message()).toBe('Hello TEST!')
    dialog.dismiss()
  })
  await page.getByRole('button', { name: 'Hello' }).click()
})
