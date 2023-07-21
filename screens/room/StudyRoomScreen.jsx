import ActionButton from '@components/common/btn/ActionButton';
import Description from '@components/room/Description';
import Participants from '@components/room/Participants';
import Schedules from '@components/room/Schedules';
import ThisWeekDetailPlans from '@components/room/ThisWeekDetailPlans';
import StudyRoomCodeInfoModal from '@components/room/modal/StudyRoomCodeInfoModal';
import StudyRoomInfoModal from '@components/room/modal/StudyRoomInfoModal';
import React, { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function StudyRoomScreen(props) {
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
  const [roomInfoModalVisible, setRoomInfoModalVisible] = useState(true);
  return (
    <Container>
      <ScrollView>
        <Description />
        <SpacingVertical>
          <Schedules startDate={roomDetail.start_date} totalWeek={roomDetail.week} />
        </SpacingVertical>

        <SpacingBottom>
          <Participants />
        </SpacingBottom>

        <SpacingBottom>
          <ThisWeekDetailPlans />
        </SpacingBottom>
      </ScrollView>
      <ButtonConatiner>
        <ActionButton
          title={'초대하기'}
          width={wp(90)}
          height={hp(8)}
          color={'#3333FF'}
          round={true}
          onPress={() => setRoomCodeInfoModalVisible(true)}
        />
      </ButtonConatiner>

      {/* 방 정보 모달 */}
      <StudyRoomInfoModal visible={roomInfoModalVisible} close={() => setRoomInfoModalVisible(false)} />
      {/* 초대코드 정보 모달 */}
      <StudyRoomCodeInfoModal visible={roomCodeInfoModalVisible} close={() => setRoomCodeInfoModalVisible(false)} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #d9d9d9;
`;

const SpacingBottom = styled.View`
  margin-bottom: ${RFValue(2)}px;
`;

const SpacingVertical = styled.View`
  margin-vertical: ${RFValue(2)}px;
`;

const ButtonConatiner = styled.View`
  width: 100%;
  height: ${hp(10)}px;
  align-self: center;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

export default StudyRoomScreen;
