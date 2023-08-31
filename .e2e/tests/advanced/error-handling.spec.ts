import { getURLForDeployment } from "@/utils"
import { test, expect, Page } from "@playwright/test"

test.use({ baseURL: getURLForDeployment('error-handling') })

test("Home page loads without any errors", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByText("Current route: /")).toBeVisible()
})

test("Error in setup() runs the global error handler and vue:error hook", async ({
  page,
}) => {
  const globalErrorHandlerPromise = waitForGlobalErrorHandlerToRan(page)
  const vueErrorHookPromise = waitForVueErrorHookToRan(page)

  await page.goto("?setup")

  await globalErrorHandlerPromise
  await vueErrorHookPromise
})

test("Error in mounted() runs the global error handler and vue:error hook", async ({
  page,
}) => {
  const globalErrorHandlerPromise = waitForGlobalErrorHandlerToRan(page)
  const vueErrorHookPromise = waitForVueErrorHookToRan(page)

  await page.goto("?mounted")

  await globalErrorHandlerPromise
  await vueErrorHookPromise
})

test("404 error triggers app:error hook and navigates to the error page", async ({
  page,
}) => {
  await page.goto("/")

  const appErrorHookPromise = waitForAppErrorHookToRan(page)
  await page.getByRole("link", { name: "404" }).click()
  await appErrorHookPromise

  await expect(
    page.getByRole("heading", { name: "Page not found: /404" })
  ).toBeVisible()
  await expect(page.getByText("There was an error")).toBeVisible()
})

test("Clearing the error on the 404 page navigates home", async ({ page }) => {
  await page.goto("/404")

  await page.getByRole("button", { name: "Clear error" }).click()

  await expect(page.getByRole("link", { name: "Home" })).toBeVisible()
})

test('Clicking on "Navigate home" on the 404 page navigates home', async ({
  page,
}) => {
  await page.goto("/404")

  await page.getByRole("link", { name: "Navigate home" }).click()

  await expect(page.getByRole("link", { name: "Home" })).toBeVisible()
})

test("Error in middleware navigates to the error page and triggers the app:error hook", async ({
  page,
}) => {
  await page.goto("/")

  const appErrorHookPromise = waitForAppErrorHookToRan(page)
  await page.getByRole("link", { name: "Middleware" }).click()
  await appErrorHookPromise

  await expect(
    page.getByRole("heading", { name: "error in middleware" })
  ).toBeVisible()
  await expect(page.getByText("There was an error")).toBeVisible()
})

test('Clicking on the "Trigger fatal error" button navigates to the error page and triggers the app:error hook', async ({
  page,
}) => {
  await page.goto("/")

  const appErrorHookPromise = waitForAppErrorHookToRan(page)
  await page.getByRole("button", { name: "Trigger fatal error" }).click()
  await appErrorHookPromise

  await expect(page.getByText("There was an error")).toBeVisible()
})

test("Triggering non-fatal error with button runs the global error handler and vue:error hook", async ({
  page,
}) => {
  await page.goto("/")
  const globalErrorHandlerPromise = waitForGlobalErrorHandlerToRan(page)
  const vueErrorHookPromise = waitForVueErrorHookToRan(page)

  await page.getByRole("button", { name: "Trigger non-fatal error" }).click()
  await globalErrorHandlerPromise
  await vueErrorHookPromise
})

function waitForGlobalErrorHandlerToRan(page: Page) {
  return page.waitForEvent("console", {
    predicate: (message) => message.text() === "global error handler",
  })
}

function waitForVueErrorHookToRan(page: Page) {
  return page.waitForEvent("console", {
    predicate: (message) => message.text() === "vue:error",
  })
}

function waitForAppErrorHookToRan(page: Page) {
  return page.waitForEvent("console", {
    predicate: (message) => message.text() === "app:error",
  })
}
