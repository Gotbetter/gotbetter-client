import { selector } from 'recoil';
import { user } from 'recoil/auth/atoms';
import { participantList } from 'recoil/participant/atoms';

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

export { myParticipantIdSelector };
