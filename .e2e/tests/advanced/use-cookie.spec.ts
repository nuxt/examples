import { test, expect } from '@playwright/test'
import { addCookies, addForcedCookie, getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('use-cookie'))

test('Login screen shows by default', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
})

test('Logging in multiple times increases counter', async ({ page }) => {
  await page.goto('/')
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)

  await page.getByPlaceholder('Enter your name...').fill('Nuxt')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('You have logged in 1 times!')).toBeVisible()
  await page.getByRole('button', { name: 'Log out' }).click()

  await page.getByPlaceholder('Enter your name...').press('Control+a')
  await page.getByPlaceholder('Enter your name...').fill('Nuxt')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('You have logged in 2 times!')).toBeVisible()
  await page.getByRole('button', { name: 'Log out' }).click()

  await page.getByPlaceholder('Enter your name...').press('Control+a')
  await page.getByPlaceholder('Enter your name...').fill('Nuxt')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('You have logged in 3 times!')).toBeVisible()
})

test('Automatic login with existing cookies', async ({ context, page }) => {
  await addCookies(context, 'use-cookie', [
    {
      name: 'user',
      value: '{"name":"Nuxt"}',
    },
    {
      name: 'logins',
      value: '1',
    },
  ])

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Welcome, Nuxt! 👋' })).toBeVisible()
  await expect(page.getByText('You have logged in 1 times!')).toBeVisible()
})

test('Clearing cookies resets the timer', async ({ context, page }) => {
  await page.goto('/')
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)

  await page.getByPlaceholder('Enter your name...').fill('Nuxt')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('You have logged in 1 times!')).toBeVisible()
  await page.getByRole('button', { name: 'Log out' }).click()

  await context.clearCookies()
  await addForcedCookie(context, 'use-cookie')
  await page.reload({ waitUntil: 'load' })
  await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)

  await page.getByPlaceholder('Enter your name...').fill('Nuxt')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('You have logged in 1 times!')).toBeVisible()
})
