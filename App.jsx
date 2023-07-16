import BackButton from '@components/common/btn/BackButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import JoinScreen from '@screens/JoinScreen';
import SignUpScreen from '@screens/auth/SignUpScreen';
import StudyRoomDetail from '@screens/room/StudyRoomDetail';
import StudyRoomRank from '@screens/room/StudyRoomRank';
import AccountScreen from '@screens/room/create/AccountScreen';
import CategoryScreen from '@screens/room/create/CategoryScreen';
import DescriptionScreen from '@screens/room/create/DescriptionScreen';
import NumericInfoScreen from '@screens/room/create/NumericInfoScreen';
import RuleScreen from '@screens/room/create/RuleScreen';
import TitleScreen from '@screens/room/create/TitleScreen';
import React from 'react';

import LoginScreen from './screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Group>
          <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" component={SignUpScreen} />
        </Stack.Group>

        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="join"
          component={JoinScreen}
          options={{
            title: '방코드 검색',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => <BackButton />,
            headerStyle: { borderBottomWidth: '1', borderBottomColor: '#EEEEEE' },
            headerTitleStyle: { color: '#000000', fontWeight: '700' },
          }}
        />
        <Stack.Screen
          name="study-room"
          component={StudyRoomDetail}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => <BackButton />,
            headerStyle: { borderBottomWidth: '1', borderBottomColor: '#EEEEEE' },
            headerTitleStyle: { color: '#000000', fontWeight: '700' },
          }}
        />
        <Stack.Screen
          name="rank"
          component={StudyRoomRank}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => <BackButton />,
            headerStyle: { borderBottomWidth: '1', borderBottomColor: '#EEEEEE' },
            headerTitleStyle: { color: '#000000', fontWeight: '700' },
          }}
        />

        <Stack.Group
          screenOptions={{
            title: '방 만들기',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => <BackButton />,
            headerStyle: { borderBottomWidth: '1', borderBottomColor: '#EEEEEE' },
            headerTitleStyle: { color: '#000000', fontWeight: '700' },
          }}
        >
          <Stack.Screen name="category" component={CategoryScreen} />
          <Stack.Screen name="title" component={TitleScreen} />
          <Stack.Screen name="description" component={DescriptionScreen} />
          <Stack.Screen name="numeric-info" component={NumericInfoScreen} />
          <Stack.Screen name="rule" component={RuleScreen} />
          <Stack.Screen name="account" component={AccountScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
