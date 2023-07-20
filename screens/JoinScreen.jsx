import ActionButton from '@components/common/btn/ActionButton';
import JoinRequestModal from '@components/join/JoinRequestModal';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function JoinScreen() {
  const [requireFulfilled] = useState(true);
  const [visible, setVisible] = useState(false);
  return (
    <Form>
      <Label>참여코드를 입력해주세요</Label>
      <Input placeholder="참여코드를 입력해주세요." />
      <ButtonContainer>
        <ActionButton
          onPress={() => requireFulfilled && setVisible(true)}
          title={'참여하기'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </ButtonContainer>

      <JoinRequestModal request="" visible={visible} close={() => setVisible(false)} />
    </Form>
  );
}

const Form = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Label = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 600;

  padding: ${RFValue(12)}px;
  margin-top: ${hp(3)}px;
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

export default JoinScreen;
