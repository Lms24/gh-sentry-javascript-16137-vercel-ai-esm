import * as Sentry from '@sentry/node'

Sentry.init({
  tracesSampler: (ctx) => {
    return 0.01
  },
  spotlight: true,
})

await import("./otherfile.js")