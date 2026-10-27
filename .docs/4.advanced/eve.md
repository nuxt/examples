---
toc: false
title: 'eve'
description: 'This example shows how to run an eve AI agent and a Nuxt app as one project with the eve/nuxt module.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/examples/tree/main/examples/advanced/eve
---

::code-explorer{path="examples/advanced/eve" default-value="app.vue"}
::

[eve](https://eve.dev) is a framework for building durable AI agents. Registering the `eve/nuxt` module serves the agent in the `agent/` directory from the same origin as the Nuxt app, and auto-imports the `useEveAgent` composable to chat with it.

The agent calls a model through the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway), so this example has no live preview. Run it locally with an `AI_GATEWAY_API_KEY`:

```bash [Terminal]
pnpm --filter eve dev
```

:read-more{icon="i-lucide-bot" to="https://eve.dev/docs/guides/frontend/nuxt" target="_blank"}
