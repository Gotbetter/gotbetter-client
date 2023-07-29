import { useRoute } from '@react-navigation/native';
import { fetchStudyRoomParticipants } from 'api/room';
import format from 'pretty-format';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { joinRequestList } from 'recoil/participant/atoms';
import { studyRoomRefreshState } from 'recoil/room/atoms';
import styled from 'styled-components/native';

import StudyRoomInviteModal from './modal/StudyRoomInviteModal';

function InviteRequests() {
  const refresh = useRecoilValue(studyRoomRefreshState);
  const setJoinRequests = useSetRecoilState(joinRequestList);
  const { roomId } = useRoute().params;

  /** 스터디룸 입장할 때마다 재요청 */
  useEffect(() => {
    refetch();
  }, [refetch, roomId]);

  /** 스터디룸 리프레시 하면 재요청 */
  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refetch, refresh]);

  /**
   * 스터디룸 참여 요청 정보 불러오기
   */
  const { isLoading, isError, data, refetch } = useQuery(
    [`studyRoomJoinRequests`, roomId],
    () => fetchStudyRoomParticipants(roomId, false),
    {
      retry: 1,
      staleTime: 500000,
      onSuccess: (data) => {
        console.log('[InviteRequests]: fetching join requests');
        setJoinRequests([...data]);
      },
      onError: (err) => {
        console.log('[InviteRequests]: error fetching join requests');
        console.log(format(err));
      },
      select: (res) => res.data,
    },
  );

  if (isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>에러발생</Text>
      </View>
    );
  }

  return (
    <>
      <InviteRequest>&#183; 초대 요청({data.length}명)</InviteRequest>
      {/* 초대하기 모달 */}
      <StudyRoomInviteModal />
    </>
  );
}

const InviteRequest = styled.Text`
  color: #3333ff;
  font-size: ${RFValue(10)}px;
  font-weight: 600;
`;

export default InviteRequests;
