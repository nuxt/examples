import { getURLForDeployment } from "@/utils"
import { test, expect } from "@playwright/test"

test.use({ baseURL: getURLForDeployment('jsx') })
test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("Inline components load", async ({ page }) => {
  await expect(page.getByText("Welcome to nuxt3")).toBeVisible()
})

test('JSX component from "component" folder loads', async ({ page }) => {
  await expect(
    page.getByText("This is an external JSX component")
  ).toBeVisible()
})
