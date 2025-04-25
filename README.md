# OpenTelemetry AI SDK Error Reproduction

This repository demonstrates an error that occurs when using Sentry with Vercel AI SDK when Sentry's Spotlight integration is enabled with certain configurations.

## Error Description

When running a Node.js application that uses both Sentry (with spotlight enabled and stacktraces attached) and Vercel's AI SDK, the following error occurs:

```
TypeError: setters.get(...)[name] is not a function
    at Object.set (/node_modules/.pnpm/import-in-the-middle@1.13.1/node_modules/import-in-the-middle/lib/register.js:13:37)
```

The error appears to be caused by a conflict in module instrumentation between Sentry and the Vercel AI SDK.

## Steps to Reproduce

1. Create a new Node.js project
2. Install the required dependencies:
   ```
   npm install @sentry/node ai
   ```
3. Create the following files:
  ```javascript
  // index.js
  import * as Sentry from '@sentry/node'

  Sentry.init({
    tracesSampler: (ctx) => {
      return 0.01
    },
    spotlight: true,
  })

  await import("./otherfile.js")
  ```
  ```javascript
  // otherfile.js
  import { generateText } from "ai";

  console.log(generateText)
  ```

4. Run the application with:
   ```
   $ node index.js
   ```

## Trigger Conditions

The error only occurs when ALL of the following conditions are met:
- Sentry's `spotlight` integration is enabled
- `tracesSampler` is configured
- The application imports the Vercel AI SDK

## Environment Information

- Node.js version: 20+
- Sentry Node SDK
- Vercel AI SDK

## Root Cause

The issue appears to stem from a conflict between instrumentation methods used by Sentry's Spotlight feature and the Vercel AI SDK. Both are likely using module hooks that interfere with each other when configured in the specific way outlined above.

## Workarounds

Until a permanent solution is available, you can work around this issue by:

1. Disabling Sentry's Spotlight integration
2. Removing the `tracesSampler` configuration
3. Hack the Vercel AI SDK to be imported in CJS mode
   1. Overloading imported file path in `module.register`
   2. Patching `node_modules/ai/package.json` to have `index.js` in a custom condition and adding `--conditions=my-condition` flag to CLI.
