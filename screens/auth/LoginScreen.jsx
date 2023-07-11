import LoginForm from '@components/auth/LoginForm';
import SubMenu from '@components/auth/SubMenu';
import AndroidSafeAreaView from '@components/common/AndroidSafeAreaView';
import InfoMessage from '@components/common/InfoMessage';
import ActionButton from '@components/common/btn/ActionButton';
import GoogleLoginButton from '@components/common/btn/GoogleLoginButton';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

function LoginScreen() {
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <AndroidSafeAreaView>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('@assets/logo.png')} resizeMode="contain" />
          <LoginForm>
            <InfoMessage message="아이디 비밀번호를 확인하세요" />
          </LoginForm>
          <View style={{ marginTop: RFValue(12) }}>
            <ActionButton title={'로그인'} width={wp(90)} height={hp(8)} color={'#3333FF'} round={true} />
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <SubMenu />
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <GoogleLoginButton />
          </View>
        </View>
      </AndroidSafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: wp(80),
    height: hp(30),

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    marginTop: hp(12),
    width: RFValue(280),
  },
  formContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'blue',
    flex: 2,
  },
});

export default LoginScreen;
