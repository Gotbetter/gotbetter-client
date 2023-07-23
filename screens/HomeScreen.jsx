import AndroidSafeAreaView from '@components/common/AndroidSafeAreaView';
import HomeFooter from '@components/home/HomeFooter';
import HomeHeader from '@components/home/HomeHeader';
import StudyRoomList from '@components/home/StudyRoomList';
import React from 'react';
import StudyRoomListFetcher from 'wrapper/home/StudyRoomListFetcher';

function HomeScreen() {
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
