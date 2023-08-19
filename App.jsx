import AutoLoginManager from '@components/auth/AutoLoginManager';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import { AuthRoutes, HomeRoutes, PlanRoutes, StudyRoomRoutes } from './routes';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RecoilRoot>
          <AutoLoginManager>
            <Stack.Navigator initialRouteName={'login'} screenOptions={{ headerShown: false }}>
              {/* 로그인 회원가입 */}
              <Stack.Screen name="auth-routes" component={AuthRoutes} />
              {/* 홈 화면 */}
              <Stack.Screen name="home-routes" component={HomeRoutes} />
              {/* 스터디룸 화면 */}
              <Stack.Screen name="study-room-routes" component={StudyRoomRoutes} />
              {/* 계획 화면 */}
              <Stack.Screen name="plan-routes" component={PlanRoutes} />
            </Stack.Navigator>
          </AutoLoginManager>
        </RecoilRoot>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
