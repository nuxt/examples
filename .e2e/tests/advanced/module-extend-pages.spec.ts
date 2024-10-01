import { test, expect } from '@playwright/test'
import { getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('module-extend-pages'))
test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)
})

test('Page that has been added by a module works', async ({ page }) => {
  await page.getByRole('link', { name: 'Test Page' }).click()
  await expect(page.getByText('Test page added by module')).toBeVisible()

  await page.getByRole('link', { name: 'Homepage' }).click()
  await expect(page.getByText('Go to Test Page')).toBeVisible()
})
