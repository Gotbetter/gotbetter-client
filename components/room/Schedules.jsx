import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

Schedules.propTypes = {
  startDate: PropTypes.string,
  totalWeek: PropTypes.number,
};

function Schedules({ startDate, totalWeek }) {
  return (
    <View style={styles.scheduleContainer}>
      <Text style={styles.title}>진행 일정</Text>
      <View style={{ width: '100%', justifyContent: 'space-around', flexDirection: 'row', marginTop: RFValue(12) }}>
        <View style={styles.itemContainer}>
          <Text style={styles.scheduleTitle}>시작{'\n'}날짜</Text>
          <Text style={styles.scheduleContent}>{startDate}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.scheduleTitle}>전체{'\n'}주차</Text>
          <Text style={styles.scheduleContent}>{totalWeek}주</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scheduleContainer: {
    width: '100%',
    height: hp(16),
    backgroundColor: '#ffffff',
    padding: RFValue(10),
    justifyContent: 'space-around',
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: 700,
  },
  scheduleTitle: {
    width: RFValue(48),
    height: RFValue(44),
    color: '#ffffff',
    fontSize: RFValue(10),
    fontWeight: 600,

    textAlign: 'center',
    textAlignVertical: 'center',

    backgroundColor: '#C4C4C4',
    borderTopLeftRadius: RFValue(18),
    borderBottomLeftRadius: RFValue(18),
  },
  scheduleContent: {
    width: RFValue(92),
    height: RFValue(44),
    color: '#697176',
    fontSize: RFValue(10),
    fontWeight: 600,

    textAlign: 'center',
    textAlignVertical: 'center',
  },
  itemContainer: {
    borderRadius: RFValue(18),
    backgroundColor: '#F3F3F3',

    flexDirection: 'row',
  },
});
export default Schedules;
