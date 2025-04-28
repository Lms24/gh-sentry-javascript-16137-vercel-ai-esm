# OpenTelemetry AI and `import-in-the-middle` Error Reproduction

This repository demonstrates an error that occurs when using Sentry with Vercel AI SDK in ESM

Original reproduction available at: https://github.com/Jaakkonen/sentry-spotlight-vercel-ai-bug

## Error Description

When running a Node.js application that registers the `import-in-the-middle` hook and adds Sentry's `SentryVercelAiInstrumentation`, the following error occurs:

```
TypeError: setters.get(...)[name] is not a function
    at Object.set (/node_modules/.pnpm/import-in-the-middle@1.13.1/node_modules/import-in-the-middle/lib/register.js:13:37)
```

It appears like IITM is trying to set the `default` export which isn't defined in the `ai` package.

## Steps to Reproduce

1. `pnpm install`
2. Run the application with:
   ```
   $ node index.js
   ```
