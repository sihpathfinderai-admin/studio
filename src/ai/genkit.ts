import {genkit, lookupModel} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// API Key 1: AI Career Plan Generator (heavy)
export const careerPlanModel = googleAI.model('gemini-2.5-flash', {
  label: 'Career Plan Model',
});

// API Key 5: Skill Tracker + Future Skills Radar (medium group)
export const skillsModel = googleAI.model('gemini-2.5-flash', {
  label: 'Skills Model',
});

// Default model for other/new flows
export const defaultModel = googleAI.model('gemini-2.5-flash', {
  label: 'Default Model',
});

export const ai = genkit({
  plugins: [googleAI()],
  models: [careerPlanModel, skillsModel, defaultModel],
  model: defaultModel, // Keep a default for simplicity
});
