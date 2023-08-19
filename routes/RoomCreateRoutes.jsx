import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BackButton from '../components/common/btn/BackButton';
import AccountScreen from '../screens/room/create/AccountScreen';
import CategoryScreen from '../screens/room/create/CategoryScreen';
import DescriptionScreen from '../screens/room/create/DescriptionScreen';
import NumericInfoScreen from '../screens/room/create/NumericInfoScreen';
import RuleScreen from '../screens/room/create/RuleScreen';
import TitleScreen from '../screens/room/create/TitleScreen';

const CreateRoom = createNativeStackNavigator();

const RoomCreateRoutes = () => {
  return (
    <CreateRoom.Navigator
      initialRouteName="category"
      screenOptions={{
        title: '방 만들기',
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerLeft: () => <BackButton />,
        headerStyle: { borderBottomWidth: '1', borderBottomColor: '#EEEEEE' },
        headerTitleStyle: { color: '#000000', fontWeight: '700' },
      }}
    >
      <CreateRoom.Screen name="category" component={CategoryScreen} />
      <CreateRoom.Screen name="title" component={TitleScreen} />
      <CreateRoom.Screen name="description" component={DescriptionScreen} />
      <CreateRoom.Screen name="numeric-info" component={NumericInfoScreen} />
      <CreateRoom.Screen name="rule" component={RuleScreen} />
      <CreateRoom.Screen name="account" component={AccountScreen} />
    </CreateRoom.Navigator>
  );
};

export default RoomCreateRoutes;
