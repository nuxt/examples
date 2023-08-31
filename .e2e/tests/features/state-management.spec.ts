import { getURLForDeployment } from "@/utils"
import { test, expect, type Page } from "@playwright/test"

test.use({ baseURL: "https://state-management.example.nuxt.space//" })
test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("Same value is displayed on load for both counters", async ({ page }) => {
  const counterValue = await getCounterValue(page)
  await expect(page.getByText(`Counter: ${counterValue}`)).toHaveCount(2)
})

test('Clicking on "-" decrements both counters', async ({ page }) => {
  const counterValue = await getCounterValue(page)
  await page.getByRole("button", { name: "-" }).click()
  await expect(page.getByText(`Counter: ${counterValue - 1}`)).toHaveCount(2)
})

test('Clicking on "+" increments both counters', async ({ page }) => {
  const counterValue = await getCounterValue(page)
  await page.getByRole("button", { name: "+" }).click()
  await expect(page.getByText(`Counter: ${counterValue + 1}`)).toHaveCount(2)
})

async function getCounterValue(page: Page) {
  const sameCounterText = await page.getByText("Same Counter:").textContent()
  return Number(sameCounterText.split(":").at(-1).trim())
}
