import { atom } from 'recoil';

// todo: home 디렉토리로 분리하기
/** 홈 화면 선택한 탭 */
const tabState = atom({
  key: 'tabState',
  default: '전체',
});

/** 스터디룸 만들기 request */
const studyRoomCreateRequest = atom({
  key: 'studyRoomCreateRequest',
  default: {
    title: '',
    max_user_num: 1,
    start_date: '',
    week: 1,
    current_week: 1,
    entry_fee: 5000,
    rule_code: '',
    account: '',
    room_category_code: '',
    description: '',
  },
});

/** 현재 스터디룸에서 방장인지 */
const myStudyRoomAuthority = atom({
  key: 'myStudyRoomAuthority',
  default: false,
});

/** 현재 스터디룸에서 나의 참가 아이디 */
const myStudyRoomParticipantId = atom({
  key: 'mySudyRoomParticipantId',
  default: -1,
});

export { tabState, studyRoomCreateRequest, myStudyRoomAuthority, myStudyRoomParticipantId };
