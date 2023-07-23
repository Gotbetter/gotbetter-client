import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studyRoomListRefreshingState } from 'recoil/room/atoms';
import { filteredStudyRoomListState } from 'recoil/room/selectors';
import styled from 'styled-components/native';

import StudyRoomListItem from './StudyRoomListItem';
import StudyRoomStatus from './StudyRoomStatus';

function StudyRoomList() {
  const studyRoomList = useRecoilValue(filteredStudyRoomListState);
  const [refreshing, setRefresh] = useRecoilState(studyRoomListRefreshingState);
  const today = useMemo(() => new Date(), []);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, []);

  function getStudyRoomStatus(studyRoom) {
    const startDate = new Date(studyRoom.start_date);

    if (today < startDate) return 'WAIT';

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7 * studyRoom.week);

    if (today <= endDate) return 'PROGRESS';
    else return 'END';
  }

  return (
    <Container>
      <StudyRoomScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {studyRoomList.map((studyRoom) => (
          <MarginBottom key={studyRoom.room_id}>
            <StudyRoomListItem room={studyRoom}>
              <StudyRoomStatus status={getStudyRoomStatus(studyRoom)} startDate={studyRoom.start_date} />
            </StudyRoomListItem>
          </MarginBottom>
        ))}
      </StudyRoomScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const MarginBottom = styled.View`
  margin-bottom: ${RFValue(20)}px;
`;

const StudyRoomScrollView = styled.ScrollView`
  padding: ${RFValue(12)}px;
`;

export default StudyRoomList;
