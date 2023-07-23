import { atom } from 'recoil';

const tabState = atom({
  key: 'tabState',
  default: '전체',
});

const studyRoomListState = atom({
  key: 'studyRoomList',
  default: [],
});

const studyRoomListRefreshingState = atom({
  key: 'studyRoomListRefreshing',
  default: false,
});

export { tabState, studyRoomListState, studyRoomListRefreshingState };
