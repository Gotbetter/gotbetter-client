import ModalButton from '@components/common/btn/ModalButton';
import ListModal from '@components/common/modal/ListModal';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';

StudyRoomInviteModal.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
};

function StudyRoomInviteModal({ visible, close }) {
  const waitParticipants = useMemo(
    () => [
      {
        participant_id: 1,
        user_id: 1,
        profile: '',
        username: '갓배러1',
      },
      {
        participant_id: 2,
        user_id: 2,
        profile: '',
        username: '갓배러2',
      },
      {
        participant_id: 3,
        user_id: 3,
        profile: '',
        username: '갓배러3',
      },
    ],
    [],
  );

  return (
    <ListModal visible={visible} onRequestClose={close}>
      <Container>
        <Label>초대하기</Label>
        <ContentContainer>
          <ScrollView>
            {waitParticipants.map((participant) => (
              <MarginBottom key={participant.participant_id}>
                <Shadow distance={1} offset={[0, 2]} style={{ borderRadius: 10 }}>
                  <WaitParticipant>
                    <View style={{ width: 50, height: 50, backgroundColor: '#C4C4C4', borderRadius: 50 }}>
                      {participant.profile}
                    </View>
                    <Name>{participant.username}</Name>
                    <ButtonGroup>
                      <ModalButton title={'수락'} width={wp(18)} height={RFValue(24)} highlight />
                      <ModalButton title={'거절'} width={wp(18)} height={RFValue(24)} />
                    </ButtonGroup>
                  </WaitParticipant>
                </Shadow>
              </MarginBottom>
            ))}
          </ScrollView>
        </ContentContainer>
        <ButtonContainer>
          <ModalButton title={'닫기'} onPress={close} />
        </ButtonContainer>
      </Container>
    </ListModal>
  );
}

const Container = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
  margin-bottom: ${RFValue(20)}px;
`;

const ContentContainer = styled.View`
  height: ${hp(50)}px;
`;

const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  width: 40%;
`;

const ButtonContainer = styled.View`
  margin-top: ${RFValue(24)}px;
`;

const WaitParticipant = styled.View`
  width: ${wp(76)}px;
  height: ${hp(12)}px;
  background-color: #ffffff;

  border-radius: 10px;
  padding: ${RFValue(12)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonGroup = styled.View`
  height: 100%;
  justify-content: space-around;
`;

const MarginBottom = styled.View`
  margin-bottom: ${RFValue(12)}px;
`;
export default StudyRoomInviteModal;
