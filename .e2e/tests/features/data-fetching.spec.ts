import { getURLForDeployment } from "@/utils"
import { test, expect } from "@playwright/test"

test.use({ baseURL: getURLForDeployment('data-fetching') })

test.describe("Index page", () => {
  test("Hello world is shown on the index page", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByText("Result of /api/hello:")).toBeVisible()
    await expect(page.getByText('{ "hello": "world" }')).toBeVisible()
  })
})

test.describe("External page", () => {
  test('Visiting "External Page" from index shows item with ID: 1', async ({
    page,
  }) => {
    await page.goto("/")
    await page.getByRole("link", { name: "Visit /external" }).click()

    await expect(page.getByRole("spinbutton")).toHaveValue("1")
    await expect(page.getByText('"id": 1')).toBeVisible()
  })

  test('Visiting "External Page" directly shows item with ID: 1', async ({
    page,
  }) => {
    await page.goto("/external")

    await expect(page.getByRole("spinbutton")).toHaveValue("1")
    await expect(page.getByText('"id": 1')).toBeVisible()
  })
})

test.describe("Component page", () => {
  test('Visiting "Component Page" from index shows the first quote', async ({
    page,
  }) => {
    await page.goto("/")
    await page.getByRole("link", { name: "Visit /component" }).click()

    await expect(
      page.getByText(
        "Life isn’t about getting and having, it’s about giving and being."
      )
    ).toBeVisible()
    await expect(page.getByText("Kevin Kruse")).toBeVisible()
  })

  test('Visiting "Component Page" directly shows the first quote', async ({
    page,
  }) => {
    await page.goto("/component")

    await expect(
      page.getByText(
        "Life isn’t about getting and having, it’s about giving and being."
      )
    ).toBeVisible()
    await expect(page.getByText("Kevin Kruse")).toBeVisible()
  })
})
