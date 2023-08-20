import AndroidSafeAreaView from '@components/common/AndroidSafeAreaView';
import HomeFooter from '@components/home/HomeFooter';
import HomeHeader from '@components/home/HomeHeader';
import StudyRoomList from '@components/home/StudyRoomList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchUser } from 'api/auth';
import React from 'react';
import Toast from 'react-native-root-toast';
import { useQuery } from 'react-query';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { user } from 'recoil/auth/atoms';
import { studyRoomCreateRequest } from 'recoil/room/atoms';

function HomeScreen() {
  const navigation = useNavigation();

  const setUser = useSetRecoilState(user);

  const resetCreateStudyRoomRequest = useResetRecoilState(studyRoomCreateRequest);
  useFocusEffect(() => {
    resetCreateStudyRoomRequest();

    if (data !== undefined) {
      console.log('caching user info');
      setUser({ ...data });
    }
  });

  const { data } = useQuery(['user'], fetchUser, {
    retry: 1,
    staleTime: 500000,
    onSuccess: (data) => {
      console.log('[HomeScreen]: fetching user info');
      setUser({ ...data });
    },
    onError: async () => {
      Toast.show('사용자 정보 조회 실패', { duration: Toast.durations.SHORT });
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');

      navigation.reset({ routes: [{ name: 'login' }] });
    },
    select: (res) => res.data,
  });

  return (
    <AndroidSafeAreaView>
      <HomeHeader />
      <StudyRoomList />
      <HomeFooter />
    </AndroidSafeAreaView>
  );
}

export default HomeScreen;
