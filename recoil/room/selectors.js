import { selector } from 'recoil';
import { user } from 'recoil/auth/atoms';

import { myStudyRoomAuthority, myStudyRoomParticipantId } from './atoms';

/** 현재 스터디룸에서 방장인지 아닌지 확인 */
const myStudyRoomAuthoritySelector = selector({
  key: 'myStudyRoomAuthoritySelector',
  get: ({ get }) => get(myStudyRoomAuthority),
  set: ({ get, set }, participants) => {
    const { user_id } = get(user);

    participants.forEach((participant) => {
      if (participant.user_id === user_id) set(myStudyRoomAuthority, participant.authority);
    });
  },
});

/**  */
const myStudyRoomParticipantIdSelector = selector({
  key: 'myStudyRoomParticipantIdSelector',
  get: ({ get }) => get(myStudyRoomParticipantId),
  set: ({ get, set }, participants) => {
    const myUserInfo = get(user);
    const curRoomParticipants = participants;

    curRoomParticipants.forEach((participant) => {
      if (participant.user_id === myUserInfo.user_id) {
        set(myStudyRoomParticipantId, participant.participant_id);
      }
    });
  },
});

export { myStudyRoomAuthoritySelector, myStudyRoomParticipantIdSelector };
