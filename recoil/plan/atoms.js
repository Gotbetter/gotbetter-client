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

const detailPlanState = atom({
  key: 'detailPlanState',
  default: [],
});

export { detailPlanState, planFetchParamsState, planState };
