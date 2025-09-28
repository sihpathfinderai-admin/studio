import {genkit, lookupModel} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// API Key 1: AI Career Plan Generator (heavy)
export const careerPlanModel = googleAI.model('gemini-2.5-flash', {
  label: 'Career Plan Model',
  apiKey: process.env.GEMINI_API_KEY_CAREER_PLAN,
});

// API Key 5: Skill Tracker + Future Skills Radar (medium group)
export const skillsModel = googleAI.model('gemini-2.5-flash', {
  label: 'Skills Model',
  apiKey: process.env.GEMINI_API_KEY_SKILLS,
});

// Default model for other/new flows
export const defaultModel = googleAI.model('gemini-2.5-flash', {
  label: 'Default Model',
  apiKey: process.env.GEMINI_API_KEY,
});

export const ai = genkit({
  plugins: [googleAI()],
  models: [careerPlanModel, skillsModel, defaultModel],
  model: defaultModel, // Keep a default for simplicity
});
