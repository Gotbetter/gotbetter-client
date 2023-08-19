import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/auth/LoginScreen';
import SignUpScreen from '@screens/auth/SignUpScreen';
import React from 'react';

const Auth = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Auth.Screen
        name="sign-up"
        component={SignUpScreen}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerStyle: {
            borderBottomWidth: '1',
            borderBottomColor: '#EEEEEE',
          },
          headerTitleStyle: {
            color: '#979797',
            fontWeight: '600',
          },
        }}
      />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
