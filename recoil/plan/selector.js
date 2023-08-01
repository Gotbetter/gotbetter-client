import { selector } from 'recoil';
import { user } from 'recoil/auth/atoms';
import { participantList } from 'recoil/participant/atoms';
import { planState } from './atoms';

const myParticipantIdSelector = selector({
  key: 'myParticipantIdSelector',
  get: ({ get }, userId) => {
    const myUserInfo = get(user);
    const curRoomParticipants = get(participantList);

    let myParticipantId;
    curRoomParticipants.forEach((participant) => {
      if (participant.user_id === myUserInfo.user_id) {
        myParticipantId = participant.participant_id;
      }
    });
    return myParticipantId;
  },
});

const checkMyPlanSelector = selector({
  key: 'checkMyPlanSelector',
  get: ({ get }) => {
    const plan = get(planState);
    const myUserInfo = get(user);

    if (plan && myUserInfo) return plan.user_id === myUserInfo.user_id;
  },
});

export { myParticipantIdSelector, checkMyPlanSelector };
