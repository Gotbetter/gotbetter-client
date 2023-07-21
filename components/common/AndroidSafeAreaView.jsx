import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

AndroidSafeAreaView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function AndroidSafeAreaView({ children }) {
  return <Container paddingTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}>{children}</Container>;
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  ${({ paddingTop }) => `padding-top: ${paddingTop}`};
`;

export default AndroidSafeAreaView;
