import { getSettingsForDeployment, wait } from "@/utils"
import { test, expect } from "@playwright/test"

test.use(getSettingsForDeployment('middleware'))

test("Global middleware is being registered", async ({ page }) => {
  const globalMiddlewareMessageLoggedPromise = page.waitForEvent("console", {
    predicate: (message) => message.text() === "running global middleware",
  })

  await page.goto("/")
  await globalMiddlewareMessageLoggedPromise
  await expect(
    page.getByText("Current route: /", { exact: true })
  ).toBeVisible()
})

test("Global middleware from plugin is being registered", async ({ page }) => {
  const globalMiddlewareMessageLoggedPromise = page.waitForEvent("console", {
    predicate: (message) =>
      message.text() === "this global middleware was added in a plugin",
  })

  await page.goto("/")
  await globalMiddlewareMessageLoggedPromise
  await expect(
    page.getByText("Current route: /", { exact: true })
  ).toBeVisible()
})

test('Inline middleware on the "forbidden" page cancels navigation', async ({
  page,
}) => {
  await page.goto("/")

  const strictlyForbiddenLoggedPromise = page.waitForEvent("console", {
    predicate: (message) => message.text() === "Strictly forbidden.",
  })
  await page.getByRole("link", { name: "Forbidden" }).click()
  await strictlyForbiddenLoggedPromise
  await wait(500)

  await expect(
    page.getByText("Current route: /", { exact: true })
  ).toBeVisible()
})

test('Middleware redirects from the "/redirect" page to the "/secret" page', async ({
  page,
}) => {
  await page.goto("/redirect")
  await expect(page.getByText("You should never see this page")).toBeHidden()
  await expect(page).toHaveURL("/secret")
})

test("Named middleware is registered on the secret page", async ({ page }) => {
  const namedMiddlewareLoggedPromise = page.waitForEvent("console", {
    predicate: (message) =>
      message.text() === "this named middleware was added in a plugin",
  })

  await page.goto("/secret")
  await namedMiddlewareLoggedPromise
  await expect(
    page.getByText("You've landed on a page that wasn't in the menu!")
  ).toBeVisible()
})
