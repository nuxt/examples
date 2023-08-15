# Nuxt Example's E2E Tests

This project contains the end-to-end tests for the examples in the repository.

## Getting Started

Install the dependencies if you haven't already in the project root:

```sh
pnpm install
```

## Commands

Running non-visual tests (recommended during development):

```sh
pnpm -F e2e test
```

Running [visual regression tests](https://playwright.dev/docs/test-snapshots):

```sh
pnpm -F e2e test:visual
```

Updating snapshots for visual regression tests:

```sh
pnpm -F e2e test:visual:update-snapshots
```

Running every test:

```sh
pnpm -F e2e test:all
```

Opening the [code generator](https://playwright.dev/docs/codegen-intro#running-codegen):

```sh
pnpm -F e2e codegen
```

Starting in [UI mode](https://playwright.dev/docs/test-ui-mode):

```sh
pnpm -F e2e ui
```

## Note for Windows Users

Windows users shouldn't run visual regression tests directly, because the CI uses ubuntu and different operating systems has different font loading behavior.

In case you want to run these tests, you should use a docker image:

```ps
docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.37.0-jammy /bin/bash
cd .e2e
npm install

# just running the tests
npx run test:visual

# updating snapshots
npx run test:visual:update-snapshots
```

See: [official docs for visual testing](https://playwright.dev/docs/test-snapshots)
