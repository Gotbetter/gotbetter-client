import { atom } from 'recoil';

/** 스터디룸 참여자 */
const participantList = atom({
  key: 'participants',
  default: [],
});

/** 스터디룸 참여 요청 보낸 사람들 */
const joinRequestList = atom({
  key: 'joinRequests',
  default: [],
});

export { participantList, joinRequestList };
