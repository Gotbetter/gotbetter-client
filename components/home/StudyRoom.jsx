import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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
  const { title, description, week, room_category, entry_fee, max_user_num, current_user_num } = room;
  return (
    <>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {children}
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
      <View style={styles.subInfoGroup}>
        <View style={styles.subInfo}>
          <Text style={styles.subInfoText}>{week}주</Text>
        </View>
        <View style={styles.subInfo}>
          <Text style={styles.subInfoText}>{room_category}</Text>
        </View>
        <View style={styles.subInfo}>
          <Text style={styles.subInfoText}>{entry_fee}원</Text>
        </View>
        <View style={[styles.subInfo, { flexDirection: 'row', alignItems: 'center', backgroundColor: '#697176' }]}>
          <Image
            source={require('@assets/user-background-icon.png')}
            resizeMode="contain"
            style={{ width: RFValue(10), height: RFValue(10), marginRight: RFValue(4) }}
          />
          <Text style={[styles.subInfoText, { color: '#ffffff' }]}>
            {current_user_num}명/{max_user_num}명
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  subInfoGroup: {
    justifyContent: 'space-between',
    flexDirection: 'row',

    width: '76%',
    marginRight: 'auto',
  },
  subInfo: {
    padding: RFValue(4),
    borderRadius: 4,
    backgroundColor: '#F2F3F5',
  },
  title: {
    maxWidth: '60%',
    fontSize: RFValue(14),
    fontWeight: 700,
  },
  description: {
    width: '100%',
    height: '30%',

    fontSize: RFValue(10),
    fontWeight: 600,
    color: '#848484',
  },
  subInfoText: {
    fontSize: RFValue(10),
    color: '#979797',
    fontWeight: 700,
  },
});

export default StudyRoom;
