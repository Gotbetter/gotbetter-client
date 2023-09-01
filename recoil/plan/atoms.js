import { atom } from 'recoil';

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

const detailPlanRecordRequest = atom({
  key: 'detailPlanRecordRequest',
  default: {
    recordTitle: '',
    recordBody: '',
    recordPhoto: null,
  },
});

export { detailPlanRecordRequest, planOppositeModalState, planAddModeState, planModifyModeState };
