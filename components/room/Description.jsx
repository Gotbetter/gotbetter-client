import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRecoilValue } from 'recoil';
import { studyRoomDetail } from 'recoil/room/atoms';
import styled from 'styled-components/native';

import RoomInfo from './RoomInfo';

function Description() {
  const { description, week, room_category, entry_fee } = useRecoilValue(studyRoomDetail);
  return (
    <Container>
      <Label>소개</Label>
      <RoomDescription>{description}</RoomDescription>
      <SubInfoGroup>
        <RoomInfo label={`${week}주`} />
        <RoomInfo label={room_category} />
        <RoomInfo label={`${entry_fee.toLocaleString('ko-KR')}원`} />
      </SubInfoGroup>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  margin-top: ${RFValue(2)}px;

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
