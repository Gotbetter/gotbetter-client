import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { studyRoomCreateRequest } from 'recoil/room/atoms';
import styled from 'styled-components/native';

import RoomCreateForm from './RoomCreateForm';

function TitleScreen(props) {
  const [request, setRequest] = useRecoilState(studyRoomCreateRequest);
  const [requireFulfilled, setRequireFulfilled] = useState(true);

  useEffect(() => {
    setRequireFulfilled(request.title !== '');
  }, [request.title]);

  const onChange = (title) => {
    setRequest((prev) => ({ ...prev, title }));
  };

  const navigation = useNavigation();
  return (
    <RoomCreateForm>
      <Label>방 이름을 지어주세요.</Label>
      <Input value={request.title} placeholder="방 이름을 지어주세요." onChangeText={onChange} />

      <ButtonContainer>
        <ActionButton
          onPress={() => navigation.navigate('description')}
          title={'다음'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
          disabled={!requireFulfilled}
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

export default TitleScreen;
