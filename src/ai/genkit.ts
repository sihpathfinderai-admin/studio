
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {definePrompt, PromptAction} from 'genkit';
import type {PromptOptions} from 'genkit';
import {z} from 'zod';

//
// API Key Setup
//
const apiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_FALLBACK,
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
].filter((k): k is string => !!k);

if (apiKeys.length === 0) {
  throw new Error('No GEMINI_API_KEY environment variables found.');
}

//
// Ordered by speed and free quota generosity
//
const MODELS = [
  'googleai/gemini-2.5-flash-lite', // 1,000/day
  'googleai/gemini-2.0-flash-lite', // 200/day
  'googleai/gemini-2.5-flash', // 250/day
  'googleai/gemini-2.0-flash', // 200/day
  'googleai/gemini-2.5-pro', // 100/day
];

let currentModelIndex = 0;
let currentApiKeyIndex = 0;

//
// Base AI client. It gets configured with the first key by default.
// The actual key used will be determined by the round-robin logic.
//
export const ai = genkit({
  plugins: [googleAI({apiKey: apiKeys[0]})],
});

//
// Round-robin model and API key selectors
//
function getNextModel() {
  const model = MODELS[currentModelIndex % MODELS.length];
  currentModelIndex++;
  return model;
}

function getNextApiKey() {
    const key = apiKeys[currentApiKeyIndex % apiKeys.length];
    currentApiKeyIndex++;
    return key;
}

//
// Custom prompt wrapper with:
//  - Round-robin load balancing for both models and API Keys.
//  - Automatic fallback on quota/500 errors.
//  - Null-safety for inputs.
//
export function definePromptWithFallback<
  I extends z.ZodTypeAny,
  O extends z.ZodTypeAny,
>(options: PromptOptions<I, O>): PromptAction<I, O> {
  return async (input, promptOptions) => {
    // This check should only apply if the prompt schema expects an input.
    if (options.input && input == null) {
      throw new Error(
        `❌ Prompt input cannot be null. Expected: ${options.input}`
      );
    }

    let keyAttempts = 0;
    while (keyAttempts < apiKeys.length) {
        const apiKey = getNextApiKey();
        console.log(`🔵 Using API Key ending in: ...${apiKey.slice(-4)}`);
        
        // Create a temporary plugin instance with the current API key
        const dynamicPlugin = googleAI({ apiKey });

        let modelAttempts = 0;
        while (modelAttempts < MODELS.length) {
            const model = getNextModel();
            const dynamicPrompt = ai.definePrompt({
                ...options,
                model,
                plugins: [dynamicPlugin], // Use the dynamically created plugin
            });

            try {
                console.log(`🟢 Using model: ${model}`);
                return await dynamicPrompt(input!, promptOptions);
            } catch (err: any) {
                const isRetryableError =
                (err.status && (err.status === 429 || err.status >= 500)) ||
                (err.code && err.code === 'quota_exceeded') ||
                (err.message &&
                    (err.message.includes('429') ||
                    err.message.includes('quota') ||
                    err.message.includes('500')));

                if (isRetryableError) {
                    console.warn(
                        `⚠️ Retryable error for ${model} (Status: ${
                        err.status || 'N/A'
                        }). Trying next model...`
                    );
                    modelAttempts++;
                } else {
                    console.error('❌ Non-retryable error:', err);
                    throw err; // For non-retryable errors, we fail fast.
                }
            }
        }
        console.warn(`🟡 All models failed for API key ...${apiKey.slice(-4)}. Trying next key...`);
        keyAttempts++;
    }

    throw new Error(
      '🚨 All models failed for all available API keys, or all keys have exceeded their free tier quota for today.'
    );
  };
}
