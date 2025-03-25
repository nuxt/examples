# Nuxt with Local Auth

Simple password based starter made with Nuxt goodies, built-in session, storage layer and composables.

This project uses [Nuxt Extend Layers](https://nuxt.com/docs/getting-started/layers) feature to implement local auth in [`auth`](./auth) directory with a modular approach. This way you can share and reuse your authentication implementation across projects and keep the code clean.

Default database is using built-in key-value storage. You can rewrite it with a custom database by updating [`./auth/server/utils/db.ts`](./auth/server/utils/db.ts)

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about Nuxt.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

Copy `.env.example` to `.env` and provide a secure string for session password.

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
