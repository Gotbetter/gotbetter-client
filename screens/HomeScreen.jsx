import AndroidSafeAreaView from '@components/common/AndroidSafeAreaView';
import HomeFooter from '@components/home/HomeFooter';
import HomeHeader from '@components/home/HomeHeader';
import StudyRoomList from '@components/home/StudyRoomList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchUser } from 'api/auth';
import format from 'pretty-format';
import React, { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery } from 'react-query';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { user } from 'recoil/auth/atoms';
import { studyRoomCreateRequest } from 'recoil/room/atoms';

function HomeScreen() {
  const navigation = useNavigation();

  const setUser = useSetRecoilState(user);

  const resetCreateStudyRoomRequest = useResetRecoilState(studyRoomCreateRequest);
  useFocusEffect(
    useCallback(() => {
      resetCreateStudyRoomRequest();

      if (data !== undefined) {
        setUser({ ...data });
      }
    }, [data, resetCreateStudyRoomRequest, setUser]),
  );

  const { data } = useQuery(['user'], fetchUser, {
    retry: 1,
    staleTime: 500000,
    onSuccess: (data) => {
      setUser({ ...data });
    },
    onError: async (err) => {
      console.log(format(err));
      Toast.show('사용자 정보 조회 실패', { duration: Toast.durations.SHORT });
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');

      navigation.reset({ routes: [{ name: 'auth-routes' }] });
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
