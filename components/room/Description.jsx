import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

import RoomInfo from './RoomInfo';

function Description(props) {
  return (
    <Container>
      <Label>소개</Label>
      <RoomDescription>
        홍익대학교 개발자 모임입니다. 💻 누구나 참여할 수 있습니다. 참여비 15000원 입금 후 참여 가능합니다. 주 1회
        비대면 스터디
      </RoomDescription>
      <SubInfoGroup>
        <RoomInfo label={`${4}주`} />
        <RoomInfo label={'코딩'} />
        <RoomInfo label={'90,000원'} />
      </SubInfoGroup>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  margin-top: ${RFValue(2)}px;
  min-height: ${hp(20)}px;
  padding: ${RFValue(10)}px;

  background-color: #ffffff;
`;

const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
`;

const RoomDescription = styled.Text`
  margin-vertical: ${RFValue(12)}px;
`;

const SubInfoGroup = styled.View`
  width: 50%;
  justify-content: space-between;
  flex-direction: row;

  margin-right: auto;
`;

export default Description;
