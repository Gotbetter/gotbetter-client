import OppositeIcon from '@components/common/icon/OppositeIcon';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function OppositeButton() {
  const opposite = false;
  const title = opposite ? '반대 누르기 완료' : '반대 누르기';
  return (
    <Container opposite={opposite}>
      <OppositeIcon color={'#ffffff'} />
      <Label>{title}</Label>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;

  border-width: 1px;
  border-radius: 18px;

  width: ${wp(56)}px;
  height: ${RFValue(40)}px;

  justify-content: center;
  align-items: center;

  background-color: ${({ opposite }) => (opposite ? '#848484' : '#3333FF')};
`;

const Label = styled.Text`
  color: #ffffff;
  font-weight: 700;
  margin-left: ${RFValue(12)}px;
`;
export default OppositeButton;
