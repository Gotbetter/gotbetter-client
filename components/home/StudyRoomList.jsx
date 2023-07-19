import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';

import StudyRoom from './StudyRoom';
import StudyRoomStatus from './StudyRoomStatus';
import { useNavigation } from '@react-navigation/native';

function StudyRoomList(props) {
  const { navigate } = useNavigation();
  const studyRoomItems = useMemo(
    () => [
      {
        room_id: '87614186-6de0-5cb1-a8c9-eed112024de1',
        title: '[매일 인증]토익 스터디',
        max_user_num: 6,
        current_user_num: 1,
        start_date: '1/19/2038',
        week: 25,
        current_week: 2,
        entry_fee: 31524,
        room_code: 'gxhXgNeXXilHPZkB',
        account: 'Roxie Palmer',
        room_category: 'gasoline',
        description: 'further rate deeply dot finest simplest sugar blood wild never boat ',
        total_entry_fee: 31929,
        rule: 53,
      },
      {
        room_id: 'e9124506-7473-534f-a203-73a5aaf099dc',
        title: '주 3회 러닝 인증방',
        max_user_num: 6,
        current_user_num: 2,
        start_date: '10/17/2056',
        week: 24,
        current_week: 2,
        entry_fee: 48025,
        room_code: 'ZRmRGlLogEIIorTorz',
        account: 'Catherine Simon',
        room_category: 'explain',
        description:
          '매일 인증하는 토익 스터디 모입방입니다. 매일 인증하는 토익 스터디 모입방입니다. 매일 인증하는 토익 스터디 모입방입니다. 매일 인증하는 토익 스터디 모입방입니다.',
        total_entry_fee: 73825,
        rule: 82,
      },
      {
        room_id: '8',
        title: '코딩 스터디',
        max_user_num: 3,
        current_user_num: 2,
        start_date: '5/30/2083',
        week: 12,
        current_week: 2,
        entry_fee: 5000,
        room_code: 'WGNnFEmuwfLHpX',
        account: 'Caleb Potter',
        room_category: 'bark',
        description: 'whom bright case compound habit let clear salmon shine eaten joined ',
        total_entry_fee: 55624,
        rule: 12,
      },
      {
        room_id: '12',
        title: 'Sylvia Hall',
        max_user_num: 4,
        current_user_num: 1,
        start_date: '3/22/2083',
        week: 14,
        current_week: 2,
        entry_fee: 5000,
        room_code: 'WGNnFEmuwfLHpX',
        account: 'Caleb Potter',
        room_category: 'bark',
        description: 'whom bright case compound habit let clear salmon shine eaten joined ',
        total_entry_fee: 55624,
        rule: 12,
      },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {studyRoomItems.map((room) => (
          <Shadow key={room.room_id} distance={4} offset={[0, 5]}>
            <TouchableOpacity style={styles.studyRoom} activeOpacity={0.8} onPress={() => navigate('study-room')}>
              <StudyRoom room={room}>
                <StudyRoomStatus room={room} />
              </StudyRoom>
            </TouchableOpacity>
          </Shadow>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    padding: RFValue(12),
    alignItems: 'center',
  },
  studyRoom: {
    width: wp(88),
    height: hp(18),

    flexDirection: 'row',
    flexWrap: 'wrap',

    backgroundColor: '#FFFFFF',
    borderRadius: 15,

    padding: RFValue(12),
    marginBottom: RFValue(20),

    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'space-around',
  },
});

export default StudyRoomList;
