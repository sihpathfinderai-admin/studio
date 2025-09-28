'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {config} from 'dotenv';
config();

// Helper function to create a configured Google AI plugin
const createGoogleAIPlugin = (apiKey: string | undefined) => {
  if (!apiKey) return null;
  return googleAI({apiKey});
};

// Create separate plugin instances for each API key
const careerPlanPlugin = createGoogleAIPlugin(process.env.GEMINI_API_KEY_CAREER_PLAN);
const roadmapPlugin = createGoogleAIPlugin(process.env.GEMINI_API_KEY_ROADMAP);
const careerExplorationPlugin = createGoogleAIPlugin(process.env.GEMINI_API_KEY_CAREER_EXPLORATION);
const profilePlugin = createGoogleAIPlugin(process.env.GEMINI_API_KEY_PROFILE);
const skillsPlugin = createGoogleAIPlugin(process.env.GEMINI_API_KEY_SKILLS);
const resumePlugin = createGoogleAIPlugin(process.env.GEMINI_API_KEY_RESUME);
const lightPlugin = createGoogleAIPlugin(process.env.GEMINI_API_KEY_LIGHT);

// Build the list of active plugins by filtering out any that are null (due to missing API keys)
const activePlugins = [
  careerPlanPlugin,
  roadmapPlugin,
  careerExplorationPlugin,
  profilePlugin,
  skillsPlugin,
  resumePlugin,
  lightPlugin,
].filter(p => p !== null);

// This is the main AI plugin configuration.
export const ai = genkit({
  plugins: activePlugins as any[], // Use 'as any[]' to satisfy TypeScript
});

// The following are model definitions that reference models from the specific plugins.
// This is the correct way to create model aliases in Genkit v1.x with different API keys.

export const careerPlanModel = careerPlanPlugin ? careerPlanPlugin.model('gemini-2.5-pro') : undefined;
export const roadmapModel = roadmapPlugin ? roadmapPlugin.model('gemini-2.5-pro') : undefined;
export const careerExplorationModel = careerExplorationPlugin ? careerExplorationPlugin.model('gemini-2.5-pro') : undefined;
export const profileAnalysisModel = profilePlugin ? profilePlugin.model('gemini-2.5-flash') : undefined;
export const skillsModel = skillsPlugin ? skillsPlugin.model('gemini-2.5-flash') : undefined;
export const resumeModel = resumePlugin ? resumePlugin.model('gemini-2.5-pro') : undefined;
export const lightModel = lightPlugin ? lightPlugin.model('gemini-2.5-flash') : undefined;
