import { test, expect } from '@playwright/test'
import { getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('locale'))
test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)
})

test.describe('British Locale', () => {
  test.use({
    locale: 'en-GB',
  })

  test('Date is in british format', async ({ page }) => {
    await expect(page.getByText('Wednesday 26 October 2016')).toBeVisible()
  })

  test('British locale has been selected', async ({ page }) => {
    await expect(page.getByRole('combobox')).toHaveText('en-GB')
  })

  test('Changing locales works', async ({ page }) => {
    await page.getByRole('combobox').click()
    await page.getByRole('option', { name: 'ko-KR' }).click()
    await expect(page.getByText('2016년 10월 26일 수요일')).toBeVisible()

    await page.getByRole('combobox').click()
    await page.getByRole('option', { name: 'fa-IR' }).click()
    await expect(page.getByText('۱۳۹۵ آبان ۵, چهارشنبه')).toBeVisible()
  })
})

test.describe('US Locale', () => {
  test.use({
    locale: 'en-US',
  })

  test('Date is in US format', async ({ page }) => {
    await expect(page.getByText('Wednesday, October 26, 2016')).toBeVisible()
  })

  test('US locale has been selected', async ({ page }) => {
    await expect(page.getByRole('combobox')).toHaveText('en-US')
  })
})
