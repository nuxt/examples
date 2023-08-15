import { test, expect } from "@playwright/test"

test.use({ baseURL: "https://vuetify.example.nuxt.space/" })
test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("Matches snapshot @visual", async ({ page }) => {
  await expect(page).toHaveScreenshot()
})
