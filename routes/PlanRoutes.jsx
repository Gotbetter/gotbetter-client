import BackButton from '@components/common/btn/BackButton';
import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlanRecordFormScreen, PlanRecordScreen, PlanScreen } from '@screens/plan';
import React from 'react';

const Plan = createNativeStackNavigator();

const PlanRoutes = () => {
  const { planner, studyRoomDetails } = useRoute().params;

  return (
    <Plan.Navigator initialRouteName="plan">
      <Plan.Screen
        name="plan"
        component={PlanScreen}
        initialParams={{ planner, studyRoomDetails }}
        options={{
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTitleStyle: { color: '#000000', fontWeight: '700' },
        }}
      />
      <Plan.Group
        navigationKey="plan-detail"
        screenOptions={{
          headerLeft: () => <BackButton />,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTitleStyle: { color: '#000000', fontWeight: '700' },
        }}
      >
        <Plan.Screen name="confirm" component={PlanRecordFormScreen} options={{ title: '계획 인증하기' }} />
        <Plan.Screen name="detail" component={PlanRecordScreen} options={{ title: '계획 인증 목록' }} />
      </Plan.Group>
    </Plan.Navigator>
  );
};

export default PlanRoutes;
