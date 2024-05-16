import { test, expect } from '@playwright/test'
import { getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('vuetify'))
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Matches snapshot @visual', async ({ page }) => {
  await expect(page).toHaveScreenshot()
})
