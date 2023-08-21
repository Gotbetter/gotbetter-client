import { fetchStudyRoomList } from 'api/room';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studyRoomListRefreshingState, tabState } from 'recoil/room/atoms';
import styled from 'styled-components/native';

import StudyRoomListItem from './StudyRoomListItem';
import StudyRoomStatus from './StudyRoomStatus';

function StudyRoomList() {
  /** 스터디룸 리스트 출력 필터 */
  const tab = useRecoilValue(tabState);
  const [refreshing, setRefresh] = useRecoilState(studyRoomListRefreshingState);

  /** 리프레시 상태일 경우 스터디룸 리스트 refetch */
  useEffect(() => {
    if (refreshing) {
      console.log('home refetch');
      refetch();
    }
  }, [refetch, refreshing]);

  const {
    isLoading,
    isError,
    refetch,
    data: studyRoomList,
  } = useQuery('studyRoomList', fetchStudyRoomList, {
    retry: 1,
    staleTime: 300000,
    onSuccess: (data) => {
      console.log('[StudyRoomListFetcher]: fetching study room list');
    },
    select: (res) => {
      switch (tab) {
        case '전체':
          return res.data;
        case '진행중': {
          return res.data.filter((studyRoom) => {
            // 현재 시각
            const today = new Date();
            const currentTime = today.getTime() - today.getTimezoneOffset() * 60000;
            // 스터디룸 시작일
            const startDate = new Date(studyRoom.start_date);
            // 방 끝나는 요일
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 7 * studyRoom.week);

            return currentTime >= startDate.getTime() && currentTime <= endDate.getTime();
          });
        }
        default:
          return res.data;
      }
    },
  });

  const onRefresh = useCallback(() => {
    console.log('home refresh');
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, [setRefresh]);

  function getStudyRoomStatus(studyRoom) {
    // 현재 시각
    const today = new Date();
    const currentTime = today.getTime() - today.getTimezoneOffset() * 60000;

    // 시작일
    const startDate = new Date(studyRoom.start_date);

    if (currentTime < startDate.getTime()) return 'WAIT';

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7 * studyRoom.week);

    if (currentTime <= endDate.getTime()) return 'PROGRESS';
    else return 'END';
  }

  if (isLoading) return <ActivityIndicator size="large" color={'#3333FF'} />;

  if (isError) return null;

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
