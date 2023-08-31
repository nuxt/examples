import { getURLForDeployment } from "@/utils"
import { test, expect } from "@playwright/test"

test.use({ baseURL: getURLForDeployment('pages') })

test.describe("Linked pages", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("Home page is shown", async ({ page }) => {
    await expect(page.getByText("Home").nth(1)).toBeVisible()
    await expect(page.getByText("Current route: /")).toBeVisible()
  })

  test('Navigating to "About" page', async ({ page }) => {
    await page.getByRole("link", { name: "About" }).click()
    await expect(page.getByText("About").nth(1)).toBeVisible()
    await expect(page.getByText("Current route: /about")).toBeVisible()
  })

  test('Navigating to "Parent/index" page', async ({ page }) => {
    await page.getByRole("link", { name: "Parent (index)" }).click()
    await expect(page.getByText("Parent Parent/index")).toBeVisible()
    await expect(page.getByText("Current route: /parent")).toBeVisible()
  })

  test('Navigating to "Parent/b" page', async ({ page }) => {
    await page.getByRole("link", { name: "Parent (b)" }).click()
    await expect(page.getByText("Parent Parent/b")).toBeVisible()
    await expect(page.getByText("Current route: /parent/b")).toBeVisible()
  })

  test("Navigating to keyed child page", async ({ page }) => {
    await page.getByRole("button", { name: "Keyed child", exact: true }).click()
    await expect(page.getByText("Parent Child reloaded: 1")).toBeVisible()
    await expect(page.getByText("Current route: /parent/reload-")).toBeVisible()
  })

  test("Navigating to keyed child with different path param increases counter", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Keyed child", exact: true }).click()
    await expect(page.getByText("Parent Child reloaded: 1")).toBeVisible()

    await page.getByRole("button", { name: "Keyed child", exact: true }).click()
    await expect(page.getByText("Parent Child reloaded: 2")).toBeVisible()
  })

  test("Navigating to non-keyed child child page", async ({ page }) => {
    await page.getByRole("button", { name: "Non-keyed child" }).click()
    await expect(page.getByText("Parent Child reloaded: 1")).toBeVisible()
    await expect(page.getByText("Current route: /parent/static-")).toBeVisible()
  })

  test("Navigating to non-keyed child child with different path param does not increases counter", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Non-keyed child" }).click()
    await expect(page.getByText("Parent Child reloaded: 1")).toBeVisible()

    await page.getByRole("button", { name: "Non-keyed child" }).click()
    await expect(page.getByText("Parent Child reloaded: 1")).toBeVisible()
  })
})

test("Navigating to catchall route", async ({ page }) => {
  await page.goto("https://pages.example.nuxt.space/catchall/1")
  await expect(page.getByText('test-[ "1" ]')).toBeVisible()
  await expect(page.getByText("Current route: /catchall/1")).toBeVisible()
})
