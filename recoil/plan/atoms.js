import { atom } from 'recoil';

const planFetchParamsState = atom({
  key: 'planFetchParamsState',
  default: {
    participantId: null,
    week: null,
  },
});

const planState = atom({
  key: 'planState',
  default: null,
});

const planAddModeState = atom({
  key: 'PlanAddModeState',
  default: false,
});

const planModifyModeState = atom({
  key: 'planModifyModeState',
  default: false,
});

const planOppositeModalState = atom({
  key: 'planOppositeModalState',
  default: false,
});

const detailPlanState = atom({
  key: 'detailPlanState',
  default: [],
});

const detailPlanRecordRequest = atom({
  key: 'detailPlanRecordRequest',
  default: {
    recordTitle: '',
    recordBody: '',
    recordPhoto: null,
  },
});

export {
  detailPlanState,
  planFetchParamsState,
  planState,
  detailPlanRecordRequest,
  planOppositeModalState,
  planAddModeState,
  planModifyModeState,
};
