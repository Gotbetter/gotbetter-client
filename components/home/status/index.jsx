import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
const Wait = () => {
  return (
    <Container>
      <Label color={'#979797'}>&#183; 7/3부터 진행</Label>
    </Container>
  );
};

const Progress = () => {
  return (
    <Container>
      <Label color={'#3333FF'}>&#183; 진행중</Label>
    </Container>
  );
};

const End = () => {
  return (
    <Container>
      <Label color={'#FF3395'}>&#183; 종료</Label>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  flex-grow: 1;
  margin-left: ${RFValue(4)}px;
`;

const Label = styled.Text`
  color: ${({ color }) => color};
  font-weight: 700;
  font-size: ${RFValue(10)}px;
`;

export { End, Progress, Wait };
