import { client } from './client';

const createPlan = (participant_id) => client.post('/plans', { participant_id });

const fetchPlan = (participant_id, week) =>
  client.get(`/plans/${participant_id}`, {
    params: { week },
  });

const fetchDetailPlan = (plan_id) => client.get(`/plans/${plan_id}/details`);

export { createPlan, fetchPlan, fetchDetailPlan };
