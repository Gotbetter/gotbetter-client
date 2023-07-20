import ActionButton from '@components/common/btn/ActionButton';
import StudyRoomCreateCompletedModal from '@components/room/modal/StudyRoomCreateCompletedModal';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

import RoomCreateForm from './RoomCreateForm';

function AccountScreen(props) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [requireFulfilled] = useState(false);

  const onClose = () => {
    setVisible(false);
    navigation.navigate('home');
  };

  return (
    <RoomCreateForm title={'계좌 번호 입력하기'}>
      <Label>계좌 번호 입력하기</Label>
      <Input placeholder="계좌 번호를 입력해주세요.." />
      <Example>ex) 국민 000000-00-00000</Example>
      <ButtonContainer>
        <ActionButton
          onPress={() => setVisible(true)}
          title={requireFulfilled ? '완료' : '계좌 번호 입력하기'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </ButtonContainer>

      <StudyRoomCreateCompletedModal visible={visible} close={onClose} />
    </RoomCreateForm>
  );
}

const Label = styled.Text`
  padding: ${RFValue(12)}px;
  margin-top: ${hp(3)}px;
  font-size: ${RFValue(18)}px;
  font-weight: 600;
`;

const Example = styled.Text`
  width: ${wp(90)}px;
  align-self: center;
  margin-top: ${RFValue(4)}px;
  padding-left: ${RFValue(4)};

  font-size: ${RFValue(10)}px;
  color: #979797;
`;

const Input = styled.TextInput`
  width: ${wp(90)}px;
  height: ${hp(7)}px;

  margin-top: ${hp(1)}px;
  padding-left: ${RFValue(12)}px;

  align-self: center;

  border-width: 1px;
  border-radius: 10px;
  border-color: #e0e0e0;
`;

const ButtonContainer = styled.View`
  align-self: center;
  margin-top: auto;
  margin-bottom: ${hp(4)}px;
`;

export default AccountScreen;
