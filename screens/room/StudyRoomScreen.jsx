import Description from '@components/room/Description';
import InviteButton from '@components/room/InviteButton';
import Participants from '@components/room/Participants';
import Schedules from '@components/room/Schedules';
import ThisWeekDetailPlans from '@components/room/ThisWeekDetailPlans';
import StudyRoomCodeInfoModal from '@components/room/modal/StudyRoomCodeInfoModal';
import StudyRoomInfoModal from '@components/room/modal/StudyRoomInfoModal';
import React, { useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRecoilState } from 'recoil';
import { studyRoomRefreshState } from 'recoil/room/atoms';
import styled from 'styled-components/native';
import PlanFetcher from 'wrapper/plan/PlanFetcher';
import StudyRoomDetailFetcher from 'wrapper/study-room/StudyRoomDetailFetcher';
import StudyRoomParticipantsFetcher from 'wrapper/study-room/StudyRoomParticipantsFetcher';

function StudyRoomScreen() {
  /** 새로고침 flag */
  const [refreshing, setRefresh] = useRecoilState(studyRoomRefreshState);

  /** 새로고침 */
  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, [setRefresh]);

  return (
    <StudyRoomParticipantsFetcher>
      <StudyRoomDetailFetcher>
        <Container>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {/* 스터디룸 정보와 관련된 컴포넌트 */}
            <Description />

            {/* 진행 일정 */}
            <SpacingVertical>
              <Schedules />
            </SpacingVertical>

            {/* 참가자 및 초대 요청 보낸 사람 */}
            <SpacingBottom>
              <Participants />
            </SpacingBottom>

            {/* 세부계획 관련 */}
            <PlanFetcher>
              <ThisWeekDetailPlans />
            </PlanFetcher>
          </ScrollView>

          {/* 초대하기 버튼 방장에게만 보임 */}
          <InviteButton />
        </Container>

        {/* 방 정보 모달 */}
        <StudyRoomInfoModal />
        {/* 초대코드 정보 모달 */}
        <StudyRoomCodeInfoModal />
      </StudyRoomDetailFetcher>
    </StudyRoomParticipantsFetcher>
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
