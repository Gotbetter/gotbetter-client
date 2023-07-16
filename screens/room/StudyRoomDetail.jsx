import ActionButton from '@components/common/btn/ActionButton';
import Description from '@components/room/Description';
import Participants from '@components/room/Participants';
import Schedules from '@components/room/Schedules';
import ThisWeekDetailPlans from '@components/room/ThisWeekDetailPlans';
import StudyRoomCodeInfoModal from '@components/room/modal/StudyRoomCodeInfoModal';
import StudyRoomInfoModal from '@components/room/modal/StudyRoomInfoModal';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

function StudyRoomDetail(props) {
  const roomDetail = useMemo(
    () => ({
      room_id: 1,
      title: '[홍익대학교 개발자 모임] 코딩 스터디',
      max_user_num: 6,
      current_user_num: 4,
      start_date: '2023-06-29',
      week: 10,
      current_week: 1,
      entry_fee: 15000,
      room_code: '51ketfmo8iqpZpUpBLz',
      account: 'seldom coast train careful ',
      room_category: '공부',
      description:
        '홍익대학교 개발자 모임입니다.\n누구나 참여할 수 있습니다.\n참여비 15000원 입금 후 참여 가능합니다.\n 주 1회 비대면 스터디',
      total_entry_fee: 60000,
      rule: 'station yard peace ',
    }),
    [],
  );

  const [roomCodeInfoModalVisible, setRoomCodeInfoModalVisible] = useState(false);
  const [roomInfoModalVisible, setRoomInfoModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ marginVertical: RFValue(2) }}>
          <Schedules startDate={roomDetail.start_date} totalWeek={roomDetail.week} />
        </View>
        <View style={{ marginBottom: RFValue(2) }}>
          <Participants />
        </View>

        <View style={{ marginBottom: RFValue(2) }}>
          <ThisWeekDetailPlans />
        </View>

        <Description />
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: hp(10),
          alignSelf: 'center',
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActionButton
          title={'초대하기'}
          width={wp(90)}
          height={hp(8)}
          color={'#3333FF'}
          round={true}
          onPress={() => setRoomCodeInfoModalVisible(true)}
        />
      </View>

      {/* 방 정보 모달 */}
      <StudyRoomInfoModal visible={roomInfoModalVisible} close={() => setRoomInfoModalVisible(false)} />
      {/* 초대코드 정보 모달 */}
      <StudyRoomCodeInfoModal visible={roomCodeInfoModalVisible} close={() => setRoomCodeInfoModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
});

export default StudyRoomDetail;
