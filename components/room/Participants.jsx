import Profile from '@components/common/Profile';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { participantList } from 'recoil/participant/atoms';
import { planFetchParamsState } from 'recoil/plan/atoms';
import { studyRoomDetail, studyRoomInviteRequestModalState } from 'recoil/room/atoms';
import { getMyAuthority } from 'recoil/room/selectors';
import styled from 'styled-components/native';

import InviteRequests from './InviteRequests';

function Participants() {
  const { roomId } = useRoute().params;
  const navigation = useNavigation();

  const studyRoom = useRecoilValue(studyRoomDetail);
  const participants = useRecoilValue(participantList);
  const isLeader = useRecoilValue(getMyAuthority);
  const setVisible = useSetRecoilState(studyRoomInviteRequestModalState);
  const setPlanFetchParams = useSetRecoilState(planFetchParamsState);

  const onPressProfile = (participantId, username) => {
    navigation.navigate('plan-routes', { username });
    setPlanFetchParams((prev) => ({ ...prev, participantId, week: studyRoom.current_week }));
  };

  return (
    <Container>
      <Label>참가자</Label>
      {isLeader && (
        // 초대 요청
        <InviteRequestLabel onPress={() => setVisible(true)}>
          <InviteRequests />
        </InviteRequestLabel>
      )}
      {/* 참가자 프로필 및 이름 출력 */}
      <ParticipantsListContainer>
        {participants.slice(0, 6).map((participant) => (
          <Participant
            key={participant.participant_id}
            onPress={() => onPressProfile(participant.participant_id, participant.username)}
          >
            <Profile
              style={{ width: 50, height: 50, borderRadius: 50 }}
              image={participant.profile}
              resizeMode="contain"
              alt="error"
            />
            <IconLabel numberOfLines={1}>{participant.username}</IconLabel>
          </Participant>
        ))}
      </ParticipantsListContainer>

      {/* 랭킹 보기 */}
      <ParticipantRankButton onPress={() => navigation.navigate('rank', { roomId })}>
        <Text style={{ fontWeight: '700', color: '#979797' }}>랭킹 보기</Text>
      </ParticipantRankButton>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;

  padding: ${RFValue(10)}px;
  background-color: #ffffff;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;
`;

const Label = styled.Text`
  margin-right: auto;
  font-size: ${RFValue(16)}px;
  font-weight: 700;
`;

const InviteRequestLabel = styled.TouchableOpacity`
  margin-left: auto;
`;

const ParticipantsListContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: ${RFValue(12)}px;
  width: 100%;
`;

const Participant = styled.TouchableOpacity`
  width: 25%;
  height: ${RFValue(80)}px;

  justify-content: space-around;
  align-items: center;
`;

const ParticipantRankButton = styled.TouchableOpacity`
  width: ${wp(90)}px;
  height: ${hp(6)}px;

  justify-content: center;
  align-items: center;
  border-color: #cacaca;
  border-width: 1px;
  border-radius: 10px;
`;

const IconLabel = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
`;

export default Participants;
