import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

import RoomCreateForm from './RoomCreateForm';

function DescriptionScreen(props) {
  const [text, setText] = useState('');
  const [requireFulfilled] = useState(true);

  const navigation = useNavigation();

  return (
    <RoomCreateForm>
      <Label>방 소개를 작성해주세요</Label>
      <TextLength>글자수 제한 {text.length}/60</TextLength>

      <Input
        value={text}
        onChangeText={setText}
        maxLength={60}
        multiline={true}
        placeholder="어떤 활동을 할지 간단하게 소개해주세요."
      />
      <ButtonContainer>
        <ActionButton
          onPress={() => navigation.navigate('numeric-info')}
          title={'다음'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </ButtonContainer>
    </RoomCreateForm>
  );
}

const Label = styled.Text`
  padding: ${RFValue(12)}px;
  margin-top: ${hp(3)}px;
  font-size: ${RFValue(18)}px;
  font-weight: 600;
`;

const TextLength = styled.Text`
  padding-left: ${RFValue(20)}px;
  color: #979797;
`;

const Input = styled.TextInput`
  width: ${wp(90)}px;
  height: ${hp(20)}px;
  margin-top: ${hp(1)}px;
  padding: ${RFValue(12)}px;

  align-self: center;
  text-align-vertical: top;

  border-width: 1px;
  border-radius: 10px;
  border-color: #e0e0e0;
`;

const ButtonContainer = styled.View`
  align-self: center;
  margin-top: auto;
  margin-bottom: ${hp(4)}px;
`;
export default DescriptionScreen;
