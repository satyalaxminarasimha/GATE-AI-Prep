import { config } from 'dotenv';
config();

import '@/ai/flows/generate-mcq-questions.ts';
import '@/ai/flows/explain-answer.ts';