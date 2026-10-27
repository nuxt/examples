---
toc: false
title: 'eve'
description: 'This example runs an eve issue triage agent inside a Nuxt app with the eve/nuxt module.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/examples/tree/main/examples/advanced/eve
---

::code-explorer{path="examples/advanced/eve" default-value="agent/tools/triage_issues.ts"}
::

This example runs an [eve](https://eve.dev) agent inside a Nuxt app. The agent triages issues: a decision model classifies each one, and a reviewer subagent checks the ones it is unsure about.

- `nuxt.config.ts`: the `eve/nuxt` module serves the agent at `/eve/v1/*`
- `agent/tools/triage_issues.ts`: the triage workflow
- `agent/subagents/reviewer/`: the reviewer subagent
- `agent/lib/sample-issues.ts`: the sample issues
- `components/Triage.vue`: the UI, built with the auto-imported `useEveAgent` composable

The agent, the reviewer, and the decision model call models through the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway), so this example has no live preview. Run it locally with an `AI_GATEWAY_API_KEY` and select **Run triage**. To see more issues go to the reviewer, raise `CONFIDENCE_THRESHOLD` in `agent/lib/triage.ts`.

```bash [Terminal]
pnpm --filter eve dev
```

`agent/channels/eve.ts` uses `none()`, so a deployment would accept anonymous browser requests and spend your AI Gateway credits. Replace `none()` with your app's auth before you deploy. See [Auth & route protection](https://eve.dev/docs/guides/auth-and-route-protection).

:read-more{icon="i-lucide-bot" to="https://eve.dev/docs/guides/frontend/nuxt" target="_blank"}
