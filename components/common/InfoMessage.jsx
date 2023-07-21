import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

InfoMessage.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string,
};

function InfoMessage({ error = false, message = '' }) {
  return (
    <Container>
      <Label error={error}>{message}</Label>
    </Container>
  );
}

const Container = styled.View`
  align-self: flex-start;
  padding-left: ${RFValue(10)}px;
`;

const Label = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({ error }) => (error ? '#f44336' : '#64B5F6')};
`;

export default InfoMessage;
