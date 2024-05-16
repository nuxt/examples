import { test, expect } from '@playwright/test'
import { getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('jsx'))
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Inline components load', async ({ page }) => {
  await expect(page.getByText('Nuxt 3')).toBeVisible()
})

test('JSX component from "component" folder loads', async ({ page }) => {
  await expect(
    page.getByText('This is an external JSX component'),
  ).toBeVisible()
})
