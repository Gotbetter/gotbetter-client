import { client } from './client';

const createPlan = (participant_id) => client.post('/plans', { participant_id });

const fetchPlan = (participant_id, week) =>
  client.get(`/plans/${participant_id}`, {
    params: { week },
  });

const fetchDetailPlan = (plan_id) => client.get(`/plans/${plan_id}/details`);

const completeDetailPlanRequest = (plan_id, detail_plan_id) =>
  client.patch(`/plans/${plan_id}/details/${detail_plan_id}/completed`);

const completeUndoDetailPlanRequest = (plan_id, detail_plan_id) =>
  client.patch(`/plans/${plan_id}/details/${detail_plan_id}/completed-undo`);

const createDetailPlanRecord = (detail_plan_id, formData) =>
  client.post(`/details/${detail_plan_id}/records`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

const fetchPlanDislike = (plan_id) => client.get(`/plans/${plan_id}/dislike`);

const dislikePlan = (plan_id) => client.post(`/plans/${plan_id}/dislike`);

const undoDislikePlan = (plan_id) => client.delete(`/plans/${plan_id}/dislike`);

const createDetailPlan = (plan_id, content) => client.post(`plans/${plan_id}/details`, { content });

const updateDetailPlan = (plan_id, detail_plan_id, content) =>
  client.patch(`/plans/${plan_id}/details/${detail_plan_id}`, { content });

const deleteDetailPlan = (plan_id, detail_plan_id) => client.delete(`/plans/${plan_id}/details/${detail_plan_id}`);

const fetchDetailPlanRecords = (detail_plan_id) => client.get(`/details/${detail_plan_id}/records`);

const deleteDetailPlanRecordRequest = (detail_plan_id, record_id) =>
  client.delete(`/details/${detail_plan_id}/records/${record_id}`);

const dislikePlanRecord = (detail_plan_id) => client.post(`/details/${detail_plan_id}/dislike`);

const undoDislikePlanRecord = (detail_plan_id) => client.delete(`/details/${detail_plan_id}/dislike`);

export {
  completeDetailPlanRequest,
  completeUndoDetailPlanRequest,
  createDetailPlanRecord,
  createPlan,
  deleteDetailPlanRecordRequest,
  fetchDetailPlan,
  fetchDetailPlanRecords,
  fetchPlan,
  fetchPlanDislike,
  dislikePlan,
  undoDislikePlan,
  createDetailPlan,
  dislikePlanRecord,
  undoDislikePlanRecord,
  deleteDetailPlan,
  updateDetailPlan,
};
