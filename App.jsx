import AutoLoginManager from '@components/auth/AutoLoginManager';
import BackButton from '@components/common/btn/BackButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import JoinScreen from '@screens/JoinScreen';
import SignUpScreen from '@screens/auth/SignUpScreen';
import PlanCertificationFormScreen from '@screens/plan/PlanCertificationFormScreen';
import PlanDetailScreen from '@screens/plan/PlanDetailScreen';
import PlanScreen from '@screens/plan/PlanScreen';
import StudyRoomRank from '@screens/room/StudyRoomRank';
import StudyRoomScreen from '@screens/room/StudyRoomScreen';
import AccountScreen from '@screens/room/create/AccountScreen';
import CategoryScreen from '@screens/room/create/CategoryScreen';
import DescriptionScreen from '@screens/room/create/DescriptionScreen';
import NumericInfoScreen from '@screens/room/create/NumericInfoScreen';
import RuleScreen from '@screens/room/create/RuleScreen';
import TitleScreen from '@screens/room/create/TitleScreen';
import React from 'react';
import { LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoginScreen from './screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AutoLoginManager>
          <Stack.Navigator initialRouteName={'login'}>
            <Stack.Group navigationKey="notLogined">
              <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen
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
              component={StudyRoomScreen}
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

            <Stack.Group>
              <Stack.Screen
                name="plan"
                component={PlanScreen}
                options={{
                  headerTitleAlign: 'center',
                  headerBackVisible: false,
                  headerTitleStyle: { color: '#000000', fontWeight: '700' },
                }}
              />
              <Stack.Screen
                name="confirm"
                component={PlanCertificationFormScreen}
                options={{
                  title: '계획 인증하기',
                  headerLeft: () => <BackButton />,
                  headerTitleAlign: 'center',
                  headerBackVisible: false,
                  headerTitleStyle: { color: '#000000', fontWeight: '700' },
                }}
              />
              <Stack.Screen
                name="detail"
                component={PlanDetailScreen}
                options={{
                  title: '[매일 인증] 토익 스터디',
                  headerLeft: () => <BackButton />,
                  headerTitleAlign: 'center',
                  headerBackVisible: false,
                  headerTitleStyle: { color: '#000000', fontWeight: '700' },
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </AutoLoginManager>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
