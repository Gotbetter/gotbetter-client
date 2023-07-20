import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

RoomEntryInfo.propTypes = {
  label: PropTypes.string,
  img: PropTypes.number,
};

function RoomEntryInfo({ img, label }) {
  return (
    <Container>
      <Image source={img} resizeMode="contain" />
      <Label>{label}</Label>
    </Container>
  );
}

const Container = styled.View`
  border-radius: 4px;
  padding: ${RFValue(4)}px;
  flex-direction: row;
  align-items: center;
  background-color: #697176;
`;

const Image = styled.Image`
  width: ${RFValue(10)}px;
  height: ${RFValue(10)}px;
  margin-right: ${RFValue(4)}px;
`;

const Label = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 700;
  color: #ffffff;
`;

export default RoomEntryInfo;
