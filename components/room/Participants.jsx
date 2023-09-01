import Profile from '@components/common/Profile';
import { useNavigation, useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRecoilValue } from 'recoil';
import { myStudyRoomAuthority } from 'recoil/room/atoms';
import styled from 'styled-components/native';

import InviteRequests from './InviteRequests';

Participants.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string.isRequired,
    current_week: PropTypes.number.isRequired,
  }).isRequired,

  participants: PropTypes.arrayOf(
    PropTypes.shape({
      user_id: PropTypes.number.isRequired,
      participant_id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      profile: PropTypes.string.isRequired,
      authority: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

function Participants({ details, participants }) {
  const { roomId } = useRoute().params;
  const navigation = useNavigation();

  const isLeader = useRecoilValue(myStudyRoomAuthority);

  /** 프로필 누르면 해당 참여자의 계획 화면으로 이동 */
  const onPressProfile = (participantId, username) => {
    navigation.navigate('plan-routes', {
      planner: { username, participantId },
      plan: { week: details.current_week },
      studyRoomDetails: { ...details },
    });
  };

  return (
    <Container>
      <Label>참가자</Label>
      {isLeader && (
        // 초대 요청
        <InviteRequests />
      )}
      {/* 참가자 프로필 및 이름 출력 */}
      <ParticipantsListContainer>
        {participants.slice(0, 6).map((participant) => (
          <Participant
            key={participant.participant_id}
            onPress={() => onPressProfile(participant.participant_id, participant.username)}
          >
            <Profile
              style={{ width: wp(10), height: wp(10), borderRadius: wp(10) }}
              image={participant.profile}
              resizeMode="contain"
              alt="error"
            />
            <IconLabel numberOfLines={1}>{participant.username}</IconLabel>
          </Participant>
        ))}
      </ParticipantsListContainer>

      {/* 랭킹 보기 */}
      <ParticipantRankButton onPress={() => navigation.navigate('rank', { roomId, details })}>
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

const ParticipantsListContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: ${RFValue(12)}px;
  width: 100%;
`;

const Participant = styled.TouchableOpacity`
  width: 25%;
  height: ${hp(10)}px;

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
