import LoginForm from '@components/auth/LoginForm';
import SubMenu from '@components/auth/SubMenu';
import AndroidSafeAreaView from '@components/common/AndroidSafeAreaView';
import ActionButton from '@components/common/btn/ActionButton';
import GoogleLoginButton from '@components/common/btn/GoogleLoginButton';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function LoginScreen() {
  const { navigate } = useNavigation();
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <AndroidSafeAreaView>
        <Container>
          <Logo source={require('@assets/logo.png')} resizeMode="contain" />
          <LoginForm></LoginForm>
          <View style={{ marginTop: RFValue(12) }}>
            <ActionButton
              title={'로그인'}
              width={wp(90)}
              height={hp(8)}
              color={'#3333FF'}
              round={true}
              onPress={() => navigate('home')}
            />
          </View>
          <MarginTopMiddle>
            <SubMenu />
          </MarginTopMiddle>
          <MarginTopHigh>
            <GoogleLoginButton />
          </MarginTopHigh>
        </Container>
      </AndroidSafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: ${wp(80)}px;
  height: ${hp(30)}px;

  justify-content: center;
  align-items: center;
`;

const MarginTopMiddle = styled.View`
  margin-top: ${RFValue(12)}px;
`;
const MarginTopHigh = styled.View`
  margin-top: ${RFValue(20)}px;
`;
export default LoginScreen;
