import Description from '@components/room/Description';
import Participants from '@components/room/Participants';
import Schedules from '@components/room/Schedules';
import StudyRoomCodeInfoModal from '@components/room/modal/StudyRoomCodeInfoModal';
import { useModal, useRefresh } from '@hooks/common';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchStudyRoomDetail, fetchStudyRoomParticipants } from 'api/room';
import React, { useEffect, useMemo } from 'react';
import { RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { myStudyRoomAuthoritySelector, myStudyRoomParticipantIdSelector } from 'recoil/room/selectors';
import styled from 'styled-components/native';

import InviteButton from '../../components/room/InviteButton';
import ThisWeekDetailPlans from '../../components/room/ThisWeekDetailPlans';
import StudyRoomInfoModal from '../../components/room/modal/StudyRoomInfoModal';

function StudyRoomScreen() {
  const navigation = useNavigation();
  /** 현재 스터디룸의 id */
  const { roomId } = useRoute().params;
  /** 새로고침 flag */
  const { refresh, onRefresh } = useRefresh('studyRoomScreen');
  /** 방 정보 모달 */
  const { openModal } = useModal('studyRoomInfo');
  /** 현재 방 참가 했는지에 대한 상태 */
  const accepted = useMemo(() => true, []);
  /** 현재 스터디룸에서 내가 방장인지 설정 */
  const setAuthority = useSetRecoilState(myStudyRoomAuthoritySelector);
  /** 현재 스터디룸에서 나의 참가자 Id 설정 */
  const setMyParticipantId = useSetRecoilState(myStudyRoomParticipantIdSelector);

  /** 스터디룸 detail, participants 새로고침 */
  useEffect(() => {
    if (refresh.refreshing) {
      refetchParticipants();
      refetchStudyRoomDetails();
    }
  }, [refresh, refetchParticipants, refetchStudyRoomDetails]);

  /** 스터디룸이 바뀔때마다 방장인지 확인 */
  useEffect(() => {
    if (participants == null) {
      return;
    }
    setAuthority(participants);
    setMyParticipantId(participants);
  }, [participants, setAuthority, setMyParticipantId]);

  /** 스터디룸 헤더 헤더 초기화 */
  useEffect(() => {
    if (studyRoomDetails == null) {
      return;
    }
    navigation.setOptions({
      title: studyRoomDetails.title,
      headerRight: () => <Feather name={'info'} size={30} onPress={openModal} />,
    });
  }, [navigation, openModal, roomId, studyRoomDetails]);

  /**
   * 스터디룸 정보 불러오기
   * @param {roomId}: 현재 들어온 스터디룸의 아이디
   */
  const {
    isLoading: IsLoadingStudyRoomDetails,
    isError: isErrorStudyRoomDetail,
    data: studyRoomDetails,
    refetch: refetchStudyRoomDetails,
  } = useQuery([`studyRoomDetail`, roomId], () => fetchStudyRoomDetail(roomId), {
    retry: 1,
    staleTime: 500000,
    onSuccess: (data) => {
      console.log('[StudyRoomDetails]: fetching study room detail');
    },
    onError: () => {
      console.log('디테일 에러');
    },
    select: (res) => res.data,
  });

  /**
   * 스터디룸 참가자 불러오기
   * @param {roomId}: 참여자들이 소속된 스터디룸의 아이디
   * @param {accepted}: 스터디룸에 소속되었는지 여부
   */
  const {
    isLoading: IsLoadingParticiapnts,
    isError: isErrorParticipants,
    data: participants,
    refetch: refetchParticipants,
  } = useQuery([`studyRoomParticipants`, roomId, accepted], () => fetchStudyRoomParticipants(roomId, accepted), {
    retry: 1,
    staleTime: 500000,
    onSuccess: (data) => {
      console.log('[StudyRoomParticipants]: fetching stuxdy room participants');
      setAuthority(data);
      setMyParticipantId(data);
    },
    onError: () => {
      console.log('[StudyRoomParticipants]: error fetching study room participants');
      console.log('참가자 에러');
    },
    select: (res) => res.data,
  });

  if (IsLoadingParticiapnts || IsLoadingStudyRoomDetails) return <ActivityIndicator size="large" color={'#3333FF'} />;

  if (isErrorParticipants || isErrorStudyRoomDetail) return null;

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refresh.refreshing} onRefresh={onRefresh} />}
      >
        {/* 스터디룸 정보와 관련된 컴포넌트 */}
        <Description details={studyRoomDetails} />

        {/* 진행 일정 */}
        <SpacingVertical>
          <Schedules details={studyRoomDetails} />
        </SpacingVertical>

        {/* 참가자 및 초대 요청 보낸 사람 */}
        <SpacingBottom>
          <Participants details={studyRoomDetails} participants={participants} />
        </SpacingBottom>

        {/* 세부계획 관련 */}
        <ThisWeekDetailPlans details={studyRoomDetails} />
      </ScrollView>

      {/* 초대하기 버튼 방장에게만 보임 */}
      <InviteButton />
      {/* 방 정보 모달 */}
      <StudyRoomInfoModal details={studyRoomDetails} />
      {/* 초대코드 정보 모달 */}
      <StudyRoomCodeInfoModal details={studyRoomDetails} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #d9d9d9;
`;

const SpacingBottom = styled.View`
  margin-bottom: ${RFValue(2)}px;
`;

const SpacingVertical = styled.View`
  margin-vertical: ${RFValue(2)}px;
`;

export default StudyRoomScreen;
