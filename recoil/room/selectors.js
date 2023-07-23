import { selector } from 'recoil';

import { currentStudyRoomState, studyRoomListState, tabState } from './atoms';

const filteredStudyRoomListState = selector({
  key: 'filteredStudyRoomList',
  get: ({ get }) => {
    const filter = get(tabState);
    const studyRoomList = get(studyRoomListState);

    switch (filter) {
      case '전체':
        return studyRoomList;

      case '진행중': {
        const today = new Date();
        const filteredStudyRoomList = studyRoomList.filter((studyRoom) => {
          const startDate = new Date(studyRoom.start_date);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 7 * studyRoom.week);
          return today >= startDate && today <= endDate;
        });
        return filteredStudyRoomList;
      }
      default:
        return studyRoomList;
    }
  },
});

export { filteredStudyRoomListState };
