import { getURLForDeployment } from "@/utils"
import { test, expect } from "@playwright/test"

test.use({ baseURL: getURLForDeployment('locale') })
test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test.describe("British Locale", () => {
  test.use({
    locale: "en-GB",
  })

  test("Date is in british format", async ({ page }) => {
    await expect(page.getByText("Wednesday, 26 October 2016")).toBeVisible()
  })

  test("British locale has been selected", async ({ page }) => {
    await expect(
      page.getByRole("combobox", { name: "Preview a different locale" })
    ).toHaveValue("en-GB")
  })

  test("Changing locales works", async ({ page }) => {
    await page
      .getByRole("combobox", { name: "Preview a different locale" })
      .selectOption("ko-KR")
    await expect(page.getByText("2016년 10월 26일 수요일")).toBeVisible()

    await page
      .getByRole("combobox", { name: "Preview a different locale" })
      .selectOption("fa-IR")
    await expect(page.getByText("۱۳۹۵ آبان ۵, چهارشنبه")).toBeVisible()
  })
})

test.describe("US Locale", () => {
  test.use({
    locale: "en-US",
  })

  test("Date is in US format", async ({ page }) => {
    await expect(page.getByText("Wednesday, October 26, 2016")).toBeVisible()
  })

  test("US locale has been selected", async ({ page }) => {
    await expect(
      page.getByRole("combobox", { name: "Preview a different locale" })
    ).toHaveValue("en-US")
  })
})
