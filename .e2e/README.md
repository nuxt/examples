# Nuxt Example's E2E Tests

This project contains the end-to-end tests for the examples in the repository.

## Getting Started

Install the dependencies if you haven't already in the project root:

```sh
pnpm install
```

## Commands

Running tests:

```sh
pnpm -F e2e test
```

Running the tests and updating snapshots for [visual regression testing](https://playwright.dev/docs/test-snapshots):

```sh
pnpm -F e2e test:update-snapshots
```

Opening the [code generator](https://playwright.dev/docs/codegen-intro#running-codegen):

```sh
pnpm -F e2e codegen
```

Starting in [UI mode](https://playwright.dev/docs/test-ui-mode):

```sh
pnpm -F e2e ui
```
