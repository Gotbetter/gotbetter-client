import { selector } from 'recoil';
import { user } from 'recoil/auth/atoms';

import { planState } from './atoms';

const checkMyPlanSelector = selector({
  key: 'checkMyPlanSelector',
  get: ({ get }) => {
    const plan = get(planState);
    const myUserInfo = get(user);

    if (plan && myUserInfo) return plan.user_id === myUserInfo.user_id;
  },
});

export { checkMyPlanSelector };
