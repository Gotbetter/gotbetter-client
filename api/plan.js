import { client } from './client';

export const createPlan = (participant_id) => client.post('/plans', { participant_id });
