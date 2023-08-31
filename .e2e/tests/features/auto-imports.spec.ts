import { getURLForDeployment } from "@/utils"
import { test, expect } from "@playwright/test"

test.use({ baseURL: getURLForDeployment('auto-imports') })
test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("Heading is visible", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Demo with auto imports" })
  ).toBeVisible()
})

test('Alert shows "Hello NUXT!" without editing the input', async ({
  page,
}) => {
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("Hello NUXT!")
    dialog.dismiss()
  })
  await page.getByRole("button", { name: "Hello" }).click()
})

test("Alert shows the right message when the input has been edited", async ({
  page,
}) => {
  await page.getByRole("textbox").fill("Test")
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("Hello TEST!")
    dialog.dismiss()
  })
  await page.getByRole("button", { name: "Hello" }).click()
})
