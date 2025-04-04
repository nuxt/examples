import { test, expect } from '@playwright/test'
import { getSettingsForDeployment } from '@/utils'

test.use(getSettingsForDeployment('config-extends'))

test('App config merged', async ({ page }) => {
  // TODO need a unique locator
  await page.goto('/')
  await expect(
    page.getByText(
      '"bar": "user", "baz": "base", "array": [ "user", "user", "user" ], "arrayNested": { "nested": { "array": [ "base", "base", "base" ] } }, "foo": "user" }',
    ),
  ).toBeVisible()
})

test.fixme('Runtime config is shown', async () => {
  // TODO it is not shown
})

test('Base button is shown', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('button', { name: 'Base Button' }),
  ).toHaveAttribute('role', 'button')
})

test('Fancy button from base layer is overridden', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Fancy Button' })).toHaveClass(
    'border p-2 fancy-button',
  )
})

test('UI button is shown', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'UI Button' })).toBeVisible()
})

test('"useFoo()" composable and "getBar()" util is usable from base layer', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.getByText('foo bar')).toBeVisible()
})

test('Plugin from base layer is registered', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByText('String generated from my auto-imported plugin!'),
  ).toBeVisible()
})

test('"api/hello" endpoint works', async ({ page }) => {
  await page.goto('/api/hello')
  await expect(page.getByText('hello')).toBeVisible()
})

test('"api/base" endpoint works', async ({ page }) => {
  await page.goto('/api/base')
  await expect(page.getByText('base')).toBeVisible()
})

test('page inherited from base layer loads', async ({ page }) => {
  await page.goto('/foo')
  await expect(page.getByText('Hello from extended page !')).toBeVisible()
})

test('Middleware for inherited page loads', async ({ page }) => {
  const inheritedMiddlewareLoggedPromise = page.waitForEvent('console', {
    predicate: message =>
      message.text() === 'Hello from extended middleware !',
  })

  await page.goto('/foo')
  await inheritedMiddlewareLoggedPromise
})
