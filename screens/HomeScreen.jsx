import AndroidSafeAreaView from '@components/common/AndroidSafeAreaView';
import HomeFooter from '@components/home/HomeFooter';
import HomeHeader from '@components/home/HomeHeader';
import StudyRoomList from '@components/home/StudyRoomList';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { studyRoomCreateRequest } from 'recoil/room/atoms';
import StudyRoomListFetcher from 'wrapper/home/StudyRoomListFetcher';

function HomeScreen() {
  const resetCreateStudyRoomRequest = useResetRecoilState(studyRoomCreateRequest);
  const isFocused = useIsFocused();
  useEffect(() => {
    resetCreateStudyRoomRequest();
  }, [isFocused, resetCreateStudyRoomRequest]);

  return (
    <AndroidSafeAreaView>
      <HomeHeader />
      <StudyRoomListFetcher>
        <StudyRoomList />
      </StudyRoomListFetcher>
      <HomeFooter />
    </AndroidSafeAreaView>
  );
}

export default HomeScreen;
