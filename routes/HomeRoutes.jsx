import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import RoomCreateRoutes from './RoomCreateRoutes';
import BackButton from '../components/common/btn/BackButton';
import HomeScreen from '../screens/HomeScreen';
import JoinScreen from '../screens/JoinScreen';

const Home = createNativeStackNavigator();

const HomeRoutes = () => {
  return (
    <Home.Navigator initialRouteName="home">
      <Home.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      <Home.Screen name="room-create" component={RoomCreateRoutes} options={{ headerShown: false }} />
      <Home.Screen
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
    </Home.Navigator>
  );
};

export default HomeRoutes;
