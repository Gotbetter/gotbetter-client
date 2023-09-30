import AndroidSafeAreaView from '@components/common/AndroidSafeAreaView';
import GoogleLoginButton from '@components/common/btn/GoogleLoginButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { oauthLoginRequest } from 'api/auth';
import * as Google from 'expo-auth-session/providers/google';
import format from 'pretty-format';
import React, { useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';
import styled from 'styled-components/native';

function LoginScreen() {
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    async function loginGoogle() {
      if (response?.type !== 'success') return;

      const token = response.authentication.accessToken;

      if (!token) return;

      try {
        const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = await response.json();

        const { id, email, name, picture } = user;
        try {
          const request = { id, email, name, picture };

          const response = await oauthLoginRequest(request);
          console.log(format(response.data));
          const { access_token, refresh_token } = response.data;
          await AsyncStorage.setItem('access_token', access_token);
          await AsyncStorage.setItem('refresh_token', refresh_token);

          Toast.show('로그인 성공', { duration: Toast.durations.SHORT });
          navigation.reset({ routes: [{ name: 'home-routes' }] });
        } catch {
          Toast.show('로그인 실패', { duration: Toast.durations.SHORT });
        }
      } catch {
        Toast.show('로그인 실패', { duration: Toast.durations.SHORT });
      }
    }
    loginGoogle();
  }, [navigation, response]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <AndroidSafeAreaView>
        <Container>
          <Logo source={require('@assets/logo.png')} resizeMode="contain" />
          <SloganWrapper>
            <Slogan>친구들과 함께</Slogan>
            <Slogan>더 나은 미래를 향해.</Slogan>
          </SloganWrapper>
          {/* 
          <LoginForm onChange={onChange}>
            <ErrorMessage error={error} message={message} />
          </LoginForm>
          <View style={{ marginTop: RFValue(12) }}>
            <ActionButton
              title={'로그인'}
              width={wp(90)}
              height={hp(8)}
              color={'#3333FF'}
              round={true}
              onPress={login}
            />
          </View>
          <MarginTopMiddle>
            <SubMenu />
          </MarginTopMiddle> */}

          <GoogleLoginWrapper>
            <GoogleLoginButton onPress={() => promptAsync()} />
          </GoogleLoginWrapper>
        </Container>
      </AndroidSafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: ${wp(80)}px;
  height: ${hp(30)}px;

  justify-content: center;
  align-items: center;
`;

const SloganWrapper = styled.View`
  width: 100%;
  height: ${hp(8)}px;

  align-items: center;
  justify-content: space-between;
`;

const Slogan = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 600;
`;

const GoogleLoginWrapper = styled.View`
  margin-top: auto;
  margin-bottom: ${hp(6)}px;
`;
export default LoginScreen;
