import AndroidSafeAreaView from '@components/common/AndroidSafeAreaView';
import HomeFooter from '@components/home/HomeFooter';
import HomeHeader from '@components/home/HomeHeader';
import StudyRoomList from '@components/home/StudyRoomList';
import React, { useState } from 'react';

function HomeScreen(props) {
  const [menu, selectMenu] = useState('전체');

  return (
    <AndroidSafeAreaView>
      <HomeHeader menu={menu} onPress={(menu) => selectMenu(menu)} />
      <StudyRoomList />
      <HomeFooter />
    </AndroidSafeAreaView>
  );
}

export default HomeScreen;
