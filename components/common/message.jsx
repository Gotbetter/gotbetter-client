import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

ErrorMessage.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string,
};

function ErrorMessage({ error, message }) {
  if (error) {
    return (
      <Container>
        <ErrorLabel>{message}</ErrorLabel>
      </Container>
    );
  }
}

SuccessMessage.propTypes = {
  success: PropTypes.bool,
  message: PropTypes.string,
};

function SuccessMessage({ success, message }) {
  if (success) {
    return (
      <Container>
        <SuccessLabel>{message}</SuccessLabel>
      </Container>
    );
  }
}

const Container = styled.View`
  align-self: flex-start;
  padding-left: ${RFValue(10)}px;
`;

const SuccessLabel = styled.Text`
  font-size: ${RFValue(10)}px;
  color: #64b5f6;
`;

const ErrorLabel = styled.Text`
  font-size: ${RFValue(10)}px;
  color: #f44336;
`;

export { ErrorMessage, SuccessMessage };
