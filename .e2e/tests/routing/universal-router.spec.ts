import { test, expect } from '@playwright/test'
import { addForcedCookie, getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('universal-router'))

test('Global middleware is being registered', async ({ page }) => {
  const globalMiddlewareMessageLoggedPromise = page.waitForEvent('console', {
    predicate: message => message.text() === 'running global middleware',
  })

  await page.goto('/')
  await globalMiddlewareMessageLoggedPromise
  await expect(page.getByText('Current route: /', { exact: true })).toBeVisible()
})

test('Timer is shows during client-side navigation', async ({ page }) => {
  await page.goto('/')
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)
  await page.getByRole('link', { name: 'Home' }).click()
  await expect(page.getByText('A page... Processing navigation')).toBeVisible()
  await expect(page.getByText('A page... Processing navigation')).toBeHidden()
})

test('Middleware redirects from the "/redirect" page to the "/secret" page', async ({ page, context }) => {
  await addForcedCookie(context, 'middleware')
  await page.goto('/redirect')
  await expect(page.getByText('You should never see this page')).toBeHidden()
  await expect(page).toHaveURL('/secret')
})

test('Middleware redirects from the "/redirect" page to the "/secret" page using custom NuxtLink', async ({
  page,
}) => {
  await page.goto('/')
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)
  await page.getByRole('button', { name: 'Custom: /redirect' }).click()
  await expect(page).toHaveURL('/secret')
})
