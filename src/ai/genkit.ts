import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { config } from 'dotenv';
config();

// This is the main AI plugin configuration.
export const ai = genkit({
  plugins: [googleAI()],
});

// The following are model definitions that use specific API keys.
// This is the correct way to create model aliases in Genkit v1.x.

// API Key 1: AI Career Plan Generator (heavy)
export const careerPlanModel = googleAI.model('gemini-2.5-pro', {
  clientOptions: { apiKey: process.env.GEMINI_API_KEY_CAREER_PLAN },
});

// API Key 2: Roadmap Generator (heavy)
export const roadmapModel = googleAI.model('gemini-2.5-pro', {
  clientOptions: { apiKey: process.env.GEMINI_API_KEY_ROADMAP },
});

// API Key 3: Career Exploration (heavy)
export const careerExplorationModel = googleAI.model('gemini-2.5-pro', {
  clientOptions: { apiKey: process.env.GEMINI_API_KEY_CAREER_EXPLORATION },
});

// API Key 4: Profiler, Stream Suggestion, Degree Recommendation (medium group)
export const profileAnalysisModel = googleAI.model('gemini-2.5-flash', {
  clientOptions: { apiKey: process.env.GEMINI_API_KEY_PROFILE },
});

// API Key 5: Skill Tracker + Future Skills Radar (medium group)
export const skillsModel = googleAI.model('gemini-2.5-flash', {
  clientOptions: { apiKey: process.env.GEMINI_API_KEY_SKILLS },
});

// API Key 6: Resume & Portfolio Builder (medium-heavy)
export const resumeModel = googleAI.model('gemini-2.5-pro', {
  clientOptions: { apiKey: process.env.GEMINI_API_KEY_RESUME },
});

// API Key 7: All light/non-AI tools
export const lightModel = googleAI.model('gemini-2.5-flash', {
  clientOptions: { apiKey: process.env.GEMINI_API_KEY_LIGHT },
});
