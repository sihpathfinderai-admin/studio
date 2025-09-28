
import {genkit, lookupModel} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {config} from 'dotenv';
config();

const modelChain = {
  models: [
    googleAI.model('gemini-2.5-flash'),
    googleAI.model('gemini-2.5-pro'),
  ],
  temperature: 0.5,
};

// API Key 1: AI Career Plan Generator (heavy)
export const careerPlanModel = lookupModel(modelChain, {
  label: 'Career Plan Model',
  apiKey: process.env.GEMINI_API_KEY_CAREER_PLAN,
});

// API Key 2: Roadmap Generator (heavy)
export const roadmapModel = lookupModel(modelChain, {
  label: 'Roadmap Model',
  apiKey: process.env.GEMINI_API_KEY_ROADMAP,
});

// API Key 3: Career Exploration (heavy)
export const careerExplorationModel = lookupModel(modelChain, {
  label: 'Career Exploration Model',
  apiKey: process.env.GEMINI_API_KEY_CAREER_EXPLORATION,
});

// API Key 4: Profiler, Stream Suggestion, Degree Recommendation (medium group)
export const profileAnalysisModel = lookupModel(modelChain, {
  label: 'Profile Analysis Model',
  apiKey: process.env.GEMINI_API_KEY_PROFILE,
});

// API Key 5: Skill Tracker + Future Skills Radar (medium group)
export const skillsModel = lookupModel(modelChain, {
  label: 'Skills Model',
  apiKey: process.env.GEMINI_API_KEY_SKILLS,
});

// API Key 6: Resume & Portfolio Builder (medium-heavy)
export const resumeModel = lookupModel(modelChain, {
  label: 'Resume Model',
  apiKey: process.env.GEMINI_API_KEY_RESUME,
});

// API Key 7: All light/non-AI tools
export const lightModel = lookupModel(modelChain, {
  label: 'Lightweight Model',
  apiKey: process.env.GEMINI_API_KEY_LIGHT,
});

// Default model for other/new flows
export const defaultModel = lookupModel(modelChain, {
  label: 'Default Model',
  apiKey: process.env.GEMINI_API_KEY,
});

export const ai = genkit({
  plugins: [googleAI()],
  models: [
    careerPlanModel,
    roadmapModel,
    careerExplorationModel,
    profileAnalysisModel,
    skillsModel,
    resumeModel,
    lightModel,
    defaultModel,
  ],
  model: defaultModel, // Keep a default for simplicity
});
