import { useModal, useRefresh } from '@hooks/common';
import { useRoute } from '@react-navigation/native';
import { fetchStudyRoomParticipants } from 'api/room';
import format from 'pretty-format';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';

import StudyRoomInviteModal from './modal/StudyRoomInviteModal';

function InviteRequests() {
  const { roomId } = useRoute().params;
  const { refresh } = useRefresh('studyRoomScreen');
  const { openModal } = useModal('joinRequests');

  /** 스터디룸 입장할 때마다 재요청 */
  useEffect(() => {
    if (refresh.refreshing) refetch();
  }, [refetch, refresh.refreshing]);

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
      },
      onError: (err) => {
        console.log('[InviteRequests]: error fetching join requests');
        console.log(format(err));
      },
      select: (res) => res.data,
    },
  );

  if (isLoading) return <ActivityIndicator size="large" color={'#3333FF'} />;

  if (isError) return null;

  return (
    <Container onPress={() => openModal()}>
      <InviteRequest>&#183; 초대 요청({data.length}명)</InviteRequest>
      {/* 초대하기 모달 */}
      <StudyRoomInviteModal requests={data} />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  margin-left: auto;
`;

const InviteRequest = styled.Text`
  color: #3333ff;
  font-size: ${RFValue(10)}px;
  font-weight: 600;
`;

export default InviteRequests;
