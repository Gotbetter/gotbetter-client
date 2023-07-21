import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

RoomInfo.propTypes = {
  label: PropTypes.string,
};

function RoomInfo({ label }) {
  return (
    <Container>
      <Label>{label}</Label>
    </Container>
  );
}

const Container = styled.View`
  background-color: #f2f3f5;
  border-radius: 4px;
  padding: ${RFValue(4)}px;
`;

const Label = styled.Text`
  color: #979797;
  font-size: ${RFValue(10)}px;
  font-weight: 700;
`;

export default RoomInfo;
