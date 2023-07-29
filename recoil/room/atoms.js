import { atom } from 'recoil';

// todo: home 디렉토리로 분리하기
/** 홈 화면 선택한 탭 */
const tabState = atom({
  key: 'tabState',
  default: '전체',
});

/** 스터디룸 리스트 */
const studyRoomListState = atom({
  key: 'studyRoomList',
  default: [],
});

/** 홈 화면 스크롤 뷰 새로고침 요청 상태 */
const studyRoomListRefreshingState = atom({
  key: 'studyRoomListRefreshing',
  default: false,
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

/** 스터디룸 정보 */
const studyRoomDetail = atom({
  key: 'studyRoomDetail',
  default: null,
});

/** 스터디룸 정보 모달 */
const studyRoomInfoModalState = atom({
  key: 'studyRoomInfoModal',
  default: false,
});
/** 스터디룸 정보 모달 */
const studyRoomInviteCodeModalState = atom({
  key: 'studyRoomInviteCodeModal',
  default: false,
});
/** 스터디룸 초대 요청 모달 */
const studyRoomInviteRequestModalState = atom({
  key: 'studyRoomInviteRequestModal',
  default: false,
});

/** 스터디룸 refresh */
const studyRoomRefreshState = atom({
  key: 'studyRoomRefreshState',
  default: false,
});

export {
  tabState,
  studyRoomListState,
  studyRoomListRefreshingState,
  studyRoomCreateRequest,
  studyRoomDetail,
  studyRoomInfoModalState,
  studyRoomInviteCodeModalState,
  studyRoomInviteRequestModalState,
  studyRoomRefreshState,
};
