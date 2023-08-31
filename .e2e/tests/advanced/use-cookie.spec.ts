import { getURLForDeployment } from "@/utils"
import { test, expect } from "@playwright/test"

test.use({ baseURL: getURLForDeployment('use-cookie') })

test("Login screen shows by default", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()
})

test("Logging in multiple times increases counter", async ({ page }) => {
  await page.goto("/")

  await page.getByPlaceholder("Enter your name...").fill("Nuxt")
  await page.getByRole("button", { name: "Log in" }).click()

  await expect(page.getByText("You have logged in 1 times!")).toBeVisible()
  await page.getByRole("button", { name: "Log out" }).click()

  await page.getByPlaceholder("Enter your name...").press("Control+a")
  await page.getByPlaceholder("Enter your name...").fill("Nuxt")
  await page.getByRole("button", { name: "Log in" }).click()

  await expect(page.getByText("You have logged in 2 times!")).toBeVisible()
  await page.getByRole("button", { name: "Log out" }).click()

  await page.getByPlaceholder("Enter your name...").press("Control+a")
  await page.getByPlaceholder("Enter your name...").fill("Nuxt")
  await page.getByRole("button", { name: "Log in" }).click()

  await expect(page.getByText("You have logged in 3 times!")).toBeVisible()
})

test("Automatic login with existing cookies", async ({ context, page }) => {
  await context.addCookies([
    {
      name: "user",
      value: '{"name":"Nuxt"}',
      domain: "use-cookie.example.nuxt.space",
      path: "/",
    },
    {
      name: "logins",
      value: "1",
      domain: "use-cookie.example.nuxt.space",
      path: "/",
    },
  ])

  await page.goto("/")

  await expect(
    page.getByRole("heading", { name: "Welcome, Nuxt! 👋" })
  ).toBeVisible()
  await expect(page.getByText("You have logged in 1 times!")).toBeVisible()
})

test("Clearing cookies resets the timer", async ({ context, page }) => {
  await page.goto("/")

  await page.getByPlaceholder("Enter your name...").fill("Nuxt")
  await page.getByRole("button", { name: "Log in" }).click()
  await expect(page.getByText("You have logged in 1 times!")).toBeVisible()
  await page.getByRole("button", { name: "Log out" }).click()

  await context.clearCookies()
  await page.reload()

  await page.getByPlaceholder("Enter your name...").fill("Nuxt")
  await page.getByRole("button", { name: "Log in" }).click()
  await expect(page.getByText("You have logged in 1 times!")).toBeVisible()
})
