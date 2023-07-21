import RoomEntryInfo from '@components/room/RoomEntryInfo';
import RoomInfo from '@components/room/RoomInfo';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';

StudyRoom.propTypes = {
  room: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    week: PropTypes.number,
    room_category: PropTypes.string,
    entry_fee: PropTypes.number,
    max_user_num: PropTypes.number,
    current_user_num: PropTypes.number,
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function StudyRoom({ room, children }) {
  const navigation = useNavigation();
  const { title, description, week, room_category, entry_fee, max_user_num, current_user_num } = room;
  return (
    <Shadow style={{ borderRadius: 15 }} distance={1} offset={[0, 3]}>
      <Container activeOpacity={0.8} onPress={() => navigation.navigate('study-room')}>
        <RoomTitle numberOfLines={1}>{title}</RoomTitle>
        {children}
        <Description numberOfLines={2}>{description}</Description>
        <SubInfoContainer>
          <RoomInfo label={`${week}주`} />
          <RoomInfo label={room_category} />
          <RoomInfo label={`${entry_fee.toLocaleString('ko-KR')}원`} />

          <RoomEntryInfo
            img={require('@assets/user-background-icon.png')}
            label={`${current_user_num}명/${max_user_num}명`}
          />
        </SubInfoContainer>
      </Container>
    </Shadow>
  );
}

const Container = styled.TouchableOpacity`
  width: ${wp(88)}px;
  height: ${hp(18)}px;

  background-color: #ffffff;
  border-radius: 15px;

  padding: ${RFValue(12)}px;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: space-around;
`;

const RoomTitle = styled.Text`
  max-width: 60%;
  font-size: ${RFValue(14)}px;
  font-weight: 700;
`;

const Description = styled.Text`
  width: 100%;

  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: #848484;
`;

const SubInfoContainer = styled.View`
  width: 76%;

  flex-direction: row;
  justify-content: space-between;

  margin-right: auto;
`;

export default StudyRoom;
