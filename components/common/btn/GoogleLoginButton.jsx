import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

GoogleLoginButton.propTypes = {
  onPress: PropTypes.func,
};

function GoogleLoginButton({ onPress }) {
  return (
    <GoogleButton onPress={onPress}>
      <GoogleLogo source={require('@assets/google-icon.png')} resizeMode="contain" />
      <Label>Google 로그인</Label>
    </GoogleButton>
  );
}

const GoogleButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${wp(90)}px;
  height: ${hp(8)}px;

  border-width: 1px;
  border-radius: 15px;
  border-color: #e4e4e4;
`;

const GoogleLogo = styled.Image``;

const Label = styled.Text`
  color: #697176;
  font-size: ${RFValue(12)}px;
  font-weight: 500;

  margin-left: ${RFValue(12)}px;
`;

export default GoogleLoginButton;
