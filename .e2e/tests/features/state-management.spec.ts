import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('state-management'))
test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)
})

test('Same value is displayed on load for both counters', async ({ page }) => {
  const counterValue = await getCounterValue(page)
  await expect(page.getByText(`Counter: ${counterValue}`)).toHaveCount(2)
})

test('Clicking on "-" decrements both counters', async ({ page }) => {
  const counterValue = await getCounterValue(page)
  await page.getByRole('button', { name: '-' }).click()
  await page.getByText(`Counter: ${counterValue - 1}`).first().isVisible()
  await expect(page.getByText(`Counter: ${counterValue - 1}`)).toHaveCount(2)
})

test('Clicking on "+" increments both counters', async ({ page }) => {
  const counterValue = await getCounterValue(page)
  await page.getByRole('button', { name: '+' }).click()
  await page.getByText(`Counter: ${counterValue + 1}`).first().isVisible()
  await expect(page.getByText(`Counter: ${counterValue + 1}`)).toHaveCount(2)
})

async function getCounterValue(page: Page) {
  const sameCounterText = await page.getByText('Same Counter:').textContent()
  return Number(sameCounterText.split(':').at(-1).trim())
}
