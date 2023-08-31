import { getSettingsForDeployment } from "@/utils"
import { test, expect } from "@playwright/test"

test.use(getSettingsForDeployment('daisyui'))
test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("Matches snapshot @visual", async ({ page }) => {
  await expect(page).toHaveScreenshot()
})
