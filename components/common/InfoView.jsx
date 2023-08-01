import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { styled } from 'styled-components';

InfoView.propTypes = {
  message: PropTypes.string,
};

function InfoView({ message }) {
  return (
    <InfoViewContainer>
      <Label>{message}</Label>
    </InfoViewContainer>
  );
}

const InfoViewContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-size: ${RFValue(16)}px;
`;

export default InfoView;
