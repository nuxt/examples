import { test, expect } from '@playwright/test'
import { getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('meta-tags'))

const INDEX_LANG = 'en'
const INDEX_DEFAULT_TITLE = 'Lucky number: 1 - Meta Tags Example'
const INDEX_DEFAULT_DESCRIPTION = 'My page\'s 1 description'
const ABOUT_PAGE_TITLE = 'About page - Meta Tags Example'
const ABOUT_PAGE_DESCRIPTION = 'This is the about page'

test.describe('Index page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('HTML lang on index page is \'en\'', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', INDEX_LANG)
  })

  test('Index page has \'my-body-class\' CSS class', async ({ page }) => {
    await expect(page.locator('body.my-body-class')).toBeVisible()
  })

  test('Lucky number is initially 1 in the title and description', async ({
    page,
  }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      INDEX_DEFAULT_DESCRIPTION,
    )
    await expect(page).toHaveTitle(INDEX_DEFAULT_TITLE)
  })
})

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('\'my-body-class\' CSS class is not present on the body', async ({
    page,
  }) => {
    await expect(page.locator('body.my-body-class')).not.toBeVisible()
    await expect(page.locator('body')).toBeVisible()
  })

  test('Title and description is set', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      ABOUT_PAGE_DESCRIPTION,
    )
    await expect(page).toHaveTitle(ABOUT_PAGE_TITLE)
  })
})

test.describe('Moving from index to about, and back to the index page', () => {
  test('HTML lang attribute changes', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', INDEX_LANG)

    await page.getByRole('link', { name: 'About page' }).click()
    await expect(page.locator('html')).not.toHaveAttribute('lang', INDEX_LANG)

    await page.getByRole('link', { name: 'Back home' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', INDEX_LANG)
  })

  test('\'my-body-class\' CSS class removed then added back', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)
    await expect(page.locator('body.my-body-class')).toBeVisible()

    await page.getByRole('link', { name: 'About page' }).click()
    await expect(page.locator('body.my-body-class')).not.toBeVisible()
    await expect(page.locator('body')).toBeVisible()

    await page.getByRole('link', { name: 'Back home' }).click()
    await expect(page.locator('body.my-body-class')).toBeVisible()
  })

  test('Title and description changes', async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      INDEX_DEFAULT_DESCRIPTION,
    )
    await expect(page).toHaveTitle(INDEX_DEFAULT_TITLE)

    await page.getByRole('link', { name: 'About page' }).click()
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      ABOUT_PAGE_DESCRIPTION,
    )
    await expect(page).toHaveTitle(ABOUT_PAGE_TITLE)

    await page.getByRole('link', { name: 'Back home' }).click()
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      INDEX_DEFAULT_DESCRIPTION,
    )
    await expect(page).toHaveTitle(INDEX_DEFAULT_TITLE)
  })
})
