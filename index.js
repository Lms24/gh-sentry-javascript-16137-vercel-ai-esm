import {register} from 'module';
import { createAddHookMessageChannel } from 'import-in-the-middle';

import { vercelAIIntegration } from '@sentry/node';

const { addHookMessagePort } = createAddHookMessageChannel();

register('import-in-the-middle/hook.mjs', import.meta.url, {
    data: { addHookMessagePort, include: [] },
    transferList: [addHookMessagePort],
});

const vercelAiInteg = vercelAIIntegration();
// setupOnce initializes the actual instrumentation
vercelAiInteg.setupOnce();

await import('./otherfile.js');