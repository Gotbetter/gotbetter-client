import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

import StudyRoomInviteModal from './modal/StudyRoomInviteModal';

function Participants() {
  const navigation = useNavigation();
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const [process] = useState(true);
  const participants = useMemo(
    () => [
      {
        participant_id: 63,
        user_id: 42,
        auth_id: 39,
        username: '갓배러12',
        email: 'daza@zubudo.dm',
        profile: 'test',
        authority: false,
      },
      {
        participant_id: 45,
        user_id: 42,
        auth_id: 39,
        username: 'Maud Ferguson',
        email: 'daza@zubudo.dm',
        profile: 'test',
        authority: false,
      },
    ],
    [],
  );

  return (
    <Container>
      <Label>참가자</Label>
      <InviteRequestButton onPress={() => setInviteModalVisible(true)}>
        <InviteRequest>&#183; 초대 요청(3명)</InviteRequest>
      </InviteRequestButton>

      <ParticipantsListContainer>
        {participants.slice(0, 6).map((participant) => (
          <Participant key={participant.participant_id} onPress={() => navigation.navigate('plan')}>
            <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#C4C4C4' }} />
            <IconLabel numberOfLines={1}>{participant.username}</IconLabel>
          </Participant>
        ))}
      </ParticipantsListContainer>

      <ParticipantRankButton onPress={() => navigation.navigate('rank')}>
        {process ? (
          <Text style={{ fontWeight: 700, color: '#979797' }}>전체 참가자 & 랭킹 보기</Text>
        ) : (
          <Text style={{ fontWeight: 700, color: '#979797' }}>전체 참가자 보기</Text>
        )}
      </ParticipantRankButton>

      {/* 초대하기 모달 */}
      <StudyRoomInviteModal visible={inviteModalVisible} close={() => setInviteModalVisible(false)} />
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
  font-size: ${RFValue(16)}px;
  font-weight: 700;
`;

const InviteRequestButton = styled.TouchableOpacity`
  margin-left: auto;
`;

const InviteRequest = styled.Text`
  color: #3333ff;
  font-size: ${RFValue(10)}px;
  font-weight: 600;
`;

const ParticipantsListContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: ${RFValue(12)}px;
  width: 100%;
`;

const Participant = styled.TouchableOpacity`
  width: 33.3%;
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
