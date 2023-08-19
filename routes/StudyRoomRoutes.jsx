import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BackButton from '../components/common/btn/BackButton';
import StudyRoomRankScreen from '../screens/room/StudyRoomRankScreen';
import StudyRoomScreen from '../screens/room/StudyRoomScreen';

const StudyRoom = createNativeStackNavigator();

const StudyRoomRoutes = () => {
  const { roomId } = useRoute().params;

  return (
    <StudyRoom.Navigator
      initialRouteName="study-room"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerLeft: () => <BackButton />,
        headerStyle: { borderBottomWidth: '1', borderBottomColor: '#EEEEEE' },
        headerTitleStyle: { color: '#000000', fontWeight: '700' },
      }}
    >
      <StudyRoom.Screen name="study-room" component={StudyRoomScreen} initialParams={{ roomId }} />
      <StudyRoom.Screen name="rank" component={StudyRoomRankScreen} />
    </StudyRoom.Navigator>
  );
};

export default StudyRoomRoutes;
